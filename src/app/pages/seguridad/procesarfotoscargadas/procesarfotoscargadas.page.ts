import { files } from 'jasmine-core';
import { RenaperService } from '../../../service/renaper.service';
import { environment } from '../../../../environments/environment.prod';
import { RevalidarRenaperService } from '../../../service/revalidar-renaper.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { AfterViewInit, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { BrowserCodeReader, BrowserPDF417Reader } from '@zxing/browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { int } from '@zxing/library/esm/customTypings';
@Component({
  selector: 'app-procesarfotoscargadas',
  templateUrl: './procesarfotoscargadas.page.html',
  styleUrls: ['./procesarfotoscargadas.page.scss'],
})
export class ProcesarfotoscargadasPage implements AfterViewInit {

  @ViewChild("imageFrente", { read: ElementRef }) imagenFrente: ElementRef;
  @ViewChild("imageDorso", { read: ElementRef }) imagenDorso: ElementRef;
  @ViewChild("selfie", { read: ElementRef }) selfie: ElementRef;
  @ViewChild("selfieDoc", { read: ElementRef }) selfieDoc: ElementRef;

  public claseProcesando = 'procesandofotos-progress';
  constructor(private plt: Platform, private screenOrientation: ScreenOrientation, public route: ActivatedRoute, public Router: Router, private navCtrl: NavController, private file: File, public toastController: ToastController, public renaper: RenaperService, public revalidar_renaper: RevalidarRenaperService) { }
  public mensaje = "Estamos procesando tus fotos ...";
  // // imagen cuando esta procesando (default) (mantiene clase default procesandofotos-progress)
  public imagen = 'assets/img/procesando.svg';
  // imagen cuando el proceso es ok (tiene que cambiar la clase a procesandofotos-success)
  // public imagen = 'assets/img/procesando-success.svg';
  //   // imagen cuando el proceso es fallido (tiene que cambiar la clase a procesandofotos-error)
  // this.imagen = 'assets/img/procesando-error.svg';
  procesando = "true";
  public static REINTENTOS = 3;
  public imagePath = "../../assets/img/foto1dni.jpg"
  public dni;
  public nombre;
  public sexo;
  public reintento = null;
  public validado = false
  public mensaje_reintento = "Reintentar";
  public omitir = false;
  public fotoDniFrente;
  public fotoRostro;
  public fec_nac;
  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    base64Data = base64Data.substr("data:image/jpeg;base64,".length, base64Data.length);

    //console.log(base64Data);
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  public valida_dni = false;
  public ACTIVAR_TEST = false;

  ngAfterViewInit() {
    if (!this.plt.is("desktop")) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (!p)
      p = Onboarding_vars.get();

    this.fotoDniFrente = p.foto_frente_dni;
    this.fotoRostro = p.foto_frente
    let dniD = p.foto_dorso_dni;
    let caraDni = p.foto_frente_con_dni;
    let data = { imagen: this.fotoDniFrente, x: 0, y: 0, width: 1280, height: 640 };
    if (p.revalidar == true) {
      this.mensaje = "Estamos revalidando tu identidad.";
      this.revalidar_renaper.revalidar_rostro(this.fotoRostro,this.fotoDniFrente,dniD,caraDni).then(data => {
        console.log("se valida el rostro correctamente.");
        this.validado = true;
        this.mensaje = "Listo tus Fotos se cargaron correctamente.";
        this.imagen = 'assets/img/procesando-success.svg';
        this.claseProcesando = 'procesandofotos-success';
      }).catch(async err => {
        console.log("Error al validar renaper");
        this.mensaje = "Vuelve a sacar la foto de tu rostro ";
        this.imagen = 'assets/img/procesando-error.svg';
        this.reintento = "validaridentidad3";
        this.validado = false
        this.claseProcesando = 'procesandofotos-error';
        console.log("Error en validar identidad");
      });
    }

    if (this.ACTIVAR_TEST) {
      this.validado = true;
      this.mensaje = "Listo tus Fotos se cargaron correctamente.";
      this.imagen = 'assets/img/procesando-success.svg';
      this.dni = p.dni;
      this.sexo = "m";
      this.nombre = p.email;
      this.valida_dni = true;
      this.claseProcesando = 'procesandofotos-success';
    }
    else {
      // this.recortarImagen(data);
      let documentsDirectory = this.file.dataDirectory;
      this.imagenFrente.nativeElement.src = this.fotoDniFrente;

      var nombre = this.calcular_nombre("dni");
      var img;
      {
        // this.imagePath = (<any>window).Ionic.WebView.convertFileSrc(documentsDirectory + nombre);
        var codeReader = new BrowserPDF417Reader();
        this.mensaje = "Estamos procesando tu Dni...";
        // console.log(this.imagePath);
        var result = codeReader.decodeFromImageElement(this.imagenFrente.nativeElement.id).then((data) => {
          console.log("QR_READER" + JSON.stringify(data));
          var datos = data.getText().split("@");
          console.log(datos);
          this.dni = datos[4];
          this.nombre = datos[2] + " " + datos[1];
          this.sexo = datos[3];
          this.valida_dni = true;
          this.fec_nac = datos[6];
          // this.file.removeFile(documentsDirectory, nombre).then(data => {
          //   console.log("Archivo Eliminado");
          // }).catch(() => {
          //   console.error("No se pudo eliminar el archivo");
          // });
          if (!localStorage.getItem("proceso_alta"))
            localStorage.setItem("proceso_alta", "89296");
          this.mensaje = "Estamos Validando tu identidad...";
          console.log("Valiando Renaper");
          this.renaper.validar_rostro(this.fotoRostro, this.dni, this.sexo).then(data => {
            console.log("se valida el rostro correctamente.");
            this.validado = true;
            this.mensaje = "Listo tus Fotos se cargaron correctamente.";
            this.imagen = 'assets/img/procesando-success.svg';
            this.claseProcesando = 'procesandofotos-success';
          }).catch(async err => {
            console.log("Error al validar renaper");
            this.mensaje = "Vuelve a sacar la foto de tu rostro ";
            this.imagen = 'assets/img/procesando-error.svg';
            this.reintento = "revisarfotos";
            this.validado = false
            this.claseProcesando = 'procesandofotos-error';
            console.log("Error en validar identidad");
          });

        }).catch(async err => {
          console.error("QR_READER " + err);
          this.file.removeFile(documentsDirectory, nombre);
          this.mensaje = "Vuelve a sacar la foto del frente de tu dni ";
          this.imagen = 'assets/img/procesando-error.svg';
          this.claseProcesando = 'procesandofotos-error';
          this.reintento = "revisarfotos";
          this.validado = false;
          this.valida_dni = false;
        });

      }
    }
  }
  Continuar() {
    localStorage.setItem("reintentos", null);
    let p = JSON.parse(localStorage.getItem("varsOnboarding"));
    if (p.revalidar == true) {
      this.navCtrl.navigateRoot("");
      return;
    }
    Onboarding_vars.add({dni:this.dni,sexo:this.sexo,nombre:this.nombre,valida_identidad:true});
    this.navCtrl.navigateForward("datospersonales");
  }
  calcular_nombre(tipo) {
    var f = new Date();
    return "fotoFrenteDni." + f.getHours() + "_" + f.getMinutes() + "_" + f.getSeconds() + ".jpg";

  }
  // public reintentos :int
  reintentar() {
    let reintentos = localStorage.getItem("reintentos")
    console.log(reintentos);
    if (reintentos == null || parseInt(reintentos) == 0) {
      localStorage.setItem("reintentos", "1");

    }
    else {
      if (parseInt(reintentos) < ProcesarfotoscargadasPage.REINTENTOS || !this.valida_dni) {
        localStorage.setItem("reintentos", (parseInt(reintentos) + 1).toString());
        console.log(reintentos);
      }
      else {
        console.log("INTENTOS: " + reintentos);
        this.omitir = true;
        this.mensaje = "No pudimos validar tu identidad, Reintenta mas tarde ";
        this.imagen = 'assets/img/procesando-error.svg';
        this.claseProcesando = 'procesandofotos-error';
      }
    }
    if (!this.omitir) {
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      p["editar"] = true;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify(p)
        },
        replaceUrl: true
      };
      this.navCtrl.navigateRoot(this.reintento, navigationExtras);
    }
  }
  omitir_validacion() {
    Onboarding_vars.add({dni:this.dni,sexo:this.sexo,nombre:this.nombre,fecha_nac:this.fec_nac,valida_identidad:false});
    this.navCtrl.navigateRoot("datospersonales");
  }


}
