import { Libs } from '../../../classes/libs';
import { NuevoDestinatarioService } from '../../../service/nuevo-destinatario.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-agregar-destinatario',
  templateUrl: './agregar-destinatario.page.html',
  styleUrls: ['./agregar-destinatario.page.scss'],
})
export class AgregarDestinatarioPage implements OnInit {
  public dato;
  public error;
  public encontrado = null;
  public destinatarioNuevo;
  public Iconname;
  public IconColor;
  public mensajeError;
  public email;
  public referencia;
  constructor(private navCtrl: NavController, public libs: Libs, public destinatario: NuevoDestinatarioService) { }

  ngOnInit() {
  }
  Continuar() {

    if (this.encontrado) {

      let nombre = this.encontrado.nombre.split(' ')[0];
      let apellido = this.encontrado.nombre.split(' ').slice(1,this.encontrado.nombre.split(' ').length)[0];
      console.log(nombre,apellido);
      
      this.destinatario.crear_destinatario(nombre, apellido, this.encontrado.documento, this.referencia, this.email, this.encontrado.cvu, this.encontrado.cbu, this.encontrado.alias,this.encontrado.nombre_banco,this.encontrado.codigo_banco,this.encontrado.tipo).then(data => {
        console.log(data);
        this.destinatarioNuevo = data;
        // this.destinatarioNuevo.tipo = data["tipo"];
        this.destinatarioNuevo.email = this.email;
        this.destinatarioNuevo.referencia=this.referencia;
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify({ destinatario: this.destinatarioNuevo })
          }
        };
        this.encontrado=null;
        this.navCtrl.navigateForward("transferencia-monto", navigationExtras);
      })
        .catch(err => {
          this.encontrado=null;
          console.log(err);
          if('data' in err && err.data){
            this.encontrado = err.data;
            this.email = err.data.email;
            this.referencia=err.data.referencia;
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({ destinatario: this.encontrado })
              }
            };
            this.encontrado=null;
            this.navCtrl.navigateForward("transferencia-monto", navigationExtras);
          }
          else
            this.mensajeError = err.log;
          
        })


    }
    else {
      let tipo = this.validar_tipo();
      this.destinatario.buscar_informacion(this.dato, tipo).then(data => {
        console.log(data);
        this.encontrado = data;
      })
        .catch(err => {
          this.encontrado = false;
          this.mensajeError = err;
        });
    }
  }
  en(valor, objeto) {
    return valor in objeto && objeto[valor] != undefined && objeto[valor] != "";
  }
  validar_tipo() {
    let valido = false;

    if (this.dato.substring(0, 5) == "00000") {
      console.log("es cvu");
      return "cvu";
    }
    else if (parseInt(this.dato)) {
      if (this.dato.toString().length == 22) {
        console.log("es cbu");
        return "cbu";
      }
    }
    else {
      if (this.dato.length >= 10) {
        console.log("es alias");
        return "alias";
      }
    }
  }
  validar_dato() {
    this.mensajeError = false;
    let valido = false;
    this.encontrado=false;
    if (parseInt(this.dato) || parseInt(this.dato) == 0) {
      if (this.dato.toString().length == 22) {
        valido = true;
      }
    }
    else {
      if (this.dato.length >= 10) {
        valido = true;
      }
    }
    (valido) ? this.Iconname = "checkmark-sharp" : this.Iconname = "close-sharp";
    (valido) ? this.IconColor = "success" : this.IconColor = "danger";
    (!valido) ? this.error = true : this.error = false;
  }
}
