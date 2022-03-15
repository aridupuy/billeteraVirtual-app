import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';
import * as XLSX from 'xlsx';
import { DestinatariosService } from '../../../service/destinatarios.service';
import { TransferirProveedorService } from '../../../service/transferir-proveedor.service';
import { NuevoDestinatarioService } from '../../../service/nuevo-destinatario.service';
import { Observable } from '../../../classes/observable';
import { AlertController } from '@ionic/angular';
import { Exception } from '@zxing/library';

@Component({
  selector: 'app-lotedetransferencia',
  templateUrl: './lotedetransferencia.page.html',
  styleUrls: ['./lotedetransferencia.page.scss'],
})
export class LotedetransferenciaPage implements OnInit {
  @ViewChild("holder") holder: ElementRef;
  @ViewChild("iconexcel") iconexcel: ElementRef;
  @ViewChild("txtsubir") txtsubir: ElementRef;
  @ViewChild("box") box: ElementRef;

  @HostListener("dragover", ["$event"]) onDragOver(evt) {
    evt.preventDefault()
    this.iconexcel.nativeElement.classList.remove("archivo-no-cargado");
    this.iconexcel.nativeElement.classList.add("archivo-cargado");
    this.txtsubir.nativeElement.firstChild.textContent = "Sueltalo Aqui";
    this.box.nativeElement.firstChild.textContent = "Esperando.";
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(evt) {
    evt.preventDefault()
    this.iconexcel.nativeElement.classList.remove("archivo-cargado");
    this.iconexcel.nativeElement.classList.add("archivo-no-cargado");
    this.txtsubir.nativeElement.firstChild.textContent = "Subir Archivo de Debitos.";
    this.box.nativeElement.firstChild.textContent = " o Arrastrelo Aqui.";
    console.log("B");
  }
  public vistas = {
    "cargar": true,
    lista: false,
    transferencias: false
  }

  constructor(public alertController: AlertController, public TrasnferenciasService: TransferirProveedorService, public DestinatariosService: DestinatariosService, public destinatario: NuevoDestinatarioService) { }
  public file;
  public status = {
    dataset: null,
    fileLoaded: true,
    error: false,
    fileName: "",
    operationInProgress: false,
    porcentaje: 0
  };
  private index = 0;
  public transferencias_erroneas = [];
  public posiciones = {
    nombre: -1,
    apellido: -1,
    cuil: -1,
    cbu: -1,
    cvu: -1,
    alias: -1,
    importe: -1,
    concepto: -1,
    email: -1,

  }
  change(event) {
    this.iconexcel.nativeElement.classList.remove("archivo-no-cargado");
    this.iconexcel.nativeElement.classList.add("archivo-cargado");
    this.txtsubir.nativeElement.firstChild.textContent = event.target.files[0].name;
    this.file = event.target.files[0];
    this.box.nativeElement.firstChild.textContent = "";
  }

  cambiar(vista) {
    this.vistas = {
      cargar: false,
      lista: false,
      transferencias: false
    }
    this.vistas[vista] = true;
  }

  ngOnInit() {


  }
  continuar() {
    Observable.suscribe("mensaje", async (msj) => {
      this.mensaje=msj;
    });
    console.log(this.file);
    Observable.notify("mensaje", "Leyendo archivo");
    let reader = new FileReader();
    reader.onload = async function (e) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      let dataset = await this.parseFileContent(sheet);
      this.setState({
        dataset: dataset,
        fileLoaded: true,
        fileName: this.file.name,
        operationInProgress: true,
        porcentaje: 0
      });
      this.process(dataset);
    }.bind(this);
    reader.readAsArrayBuffer(this.file);

  }
  setState(state) {
    this.status = state;
  }
  public encabezado;
  async parseFileContent(sheet) {
    let data = [];
    sheet.forEach(element => {
      if (element.length > 0)
        data.push(element);
    });
    this.encabezado = data[0];
    await this.encabezado.map((value, key) => {
      this.posiciones[value] = key;
    });
    data = data.slice(1, data.length);
    return data;
  }
  public fileLength;
  public mensaje="";
  async process(dataset) {
    this.fileLength = dataset.length;
    Observable.suscribe("porcentaje", async (data) => {
      this.mensaje="";
      this.status.porcentaje = ((this.index + 1) * 100) / (data[1]);
      this.index++;
      if (this.status.porcentaje == 100) {

        this.status.operationInProgress = false;
        this.status.porcentaje=0;
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Transferencias Completamente procesadas',
          message: '<p class="align-left">Verifica el estado de tus transferencias en la pestaña de "Transferencias"</p>',
          buttons: [
            {
              text: ''
            },
            {
              text: 'Entendido',
              role: 'cancel',
              cssClass: 'primary'
            }
          ]

        });

        await alert.present();
      }
      this.setState(this.status);
    })
    // console.log(dataset);
    let destinatarios: [];
    await this.DestinatariosService.obtener_destinatarios().then((data: any) => {
      destinatarios = data.data;
    });
    // console.log(destinatarios);
    let destinatario;
    await dataset.forEach(async (row, index) => {
      destinatario = destinatarios.find((value: any) => {
        // console.log(row[this.posiciones.cuil]);
        return value.cuit == row[this.posiciones.cuil];
      });
      if (!destinatario || destinatario == undefined) {
        let referencia = row[this.posiciones.apellido] + " " + row[this.posiciones.nombre];
        let type;
        let dato;
        if (this.posiciones.cbu != -1) {
          type = "cbu";
          dato = row[this.posiciones.cbu];
        }
        else
          if (this.posiciones.alias != -1) {
            type = "alias";
            dato = row[this.posiciones.alias];
          }
          else
            if (this.posiciones.cvu != -1) {
              type = "cvu";
              dato = row[this.posiciones.cvu];
            }
            else {
              throw new Exception("Error falta el parametro cvu, alias o cbu");
            }
        let datos_bancarios;
        await this.destinatario.buscar_informacion(dato, type).then(data => {
          datos_bancarios = data;
        }).catch(err => {
          console.log(err);
          Observable.notify("porcentaje", [index, dataset.length]);
          row["status"] = 0;
          row["error"] = err;
          this.transferencias_erroneas.push(row);
          return;
        });
        
        if (datos_bancarios != undefined) {
          // console.log(datos_bancarios);
          let banco = datos_bancarios.nombre_banco;
          let cod_banco = datos_bancarios.codigo_banco;
          let tipo = datos_bancarios.tipo;
          await this.destinatario.crear_destinatario(row[this.posiciones.nombre], row[this.posiciones.apellido], row[this.posiciones.cuil], referencia, row[this.posiciones.email], row[this.posiciones.cvu], row[this.posiciones.cbu], row[this.posiciones.alias], banco, cod_banco, tipo).then((data: any) => {
            // console.log(data);
            destinatario = data.extras[0];
          }).catch(err => {
            console.log(err.data);
            destinatario = err.data;
            this.status.error = true;
            Observable.notify("porcentaje", [index, dataset.length]);
            row["status"] = 0;
            row["error"] = err;
            this.transferencias_erroneas.push(row);
            return;
          })
        }
      }
      if(destinatario){
        await this.TrasnferenciasService.transferir_proveedor(destinatario.id_destinatario, row[this.posiciones.importe], row[this.posiciones.concepto], "VAR", row[this.posiciones.email]).then(data => {
          // console.log(data);
          // console.log(index, dataset.length);
          Observable.notify("porcentaje", [index, dataset.length]);
          row["status"] = 1;
          this.transferencias_erroneas.push(row);
        }).catch((err: never) => {
          console.log(err);
          row["status"] = 0;
          row["error"] = err;
          this.transferencias_erroneas.push(row);
          
          Observable.notify("porcentaje", [index, dataset.length]);
          return;
        });
        console.log(this.transferencias_erroneas);

      }
      // this.TrasnferenciasService.transferir_proveedor()

      /*ACA  va la llamada al webservice para generar transferencias masivas.*/

    })
  }
}
