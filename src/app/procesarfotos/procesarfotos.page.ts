import { files } from 'jasmine-core';
import { RenaperService } from '../service/renaper.service';
import { environment } from '../../environments/environment.prod';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { BrowserCodeReader, BrowserPDF417Reader } from '@zxing/browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { int } from '@zxing/library/esm/customTypings';
@Component({
  selector: 'app-procesarfotos',
  templateUrl: './procesarfotos.page.html',
  styleUrls: ['./procesarfotos.page.scss'],
})
export class ProcesarfotosPage implements OnInit {
  public claseProcesando = 'procesandofotos-progress';
  constructor(private screenOrientation: ScreenOrientation, public route: ActivatedRoute, public Router: Router, private navCtrl: NavController, private file: File, public toastController: ToastController, public renaper: RenaperService) { }
  public mensaje = "Estamos procesando tus fotos ...";
  // // imagen cuando esta procesando (default) (mantiene clase default procesandofotos-progress)
  public imagen = 'assets/img/procesando.svg';
  // imagen cuando el proceso es ok (tiene que cambiar la clase a procesandofotos-success)
  // public imagen = 'assets/img/procesando-success.svg';
  //   // imagen cuando el proceso es fallido (tiene que cambiar la clase a procesandofotos-error)
  // this.imagen = 'assets/img/procesando-error.svg';
  procesando = "true";
  public imagePath = "../../assets/img/foto1dni.jpg"
  public dni;
  public nombre;
  public sexo;
  public reintento = null;
  public validado = false
  public mensaje_reintento = "Reintentar";
  public omitir = false;

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    base64Data = base64Data.substr("data:image/jpeg;base64,".length, base64Data.length);

    console.log(base64Data);
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
  public ACTIVAR_TEST = true;
  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    let fotoDniFrente = p.foto_frente_dni;
    let fotoRostro = p.foto_frente
    let data = { imagen: fotoDniFrente, x: 0, y: 0, width: 1280, height: 640 };
    console.log(environment.ACTIVAR_TEST);
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
      this.file.checkDir(this.file.externalRootDirectory, '').then(async _ => {
        var binaryData = this.base64toBlob(fotoDniFrente, 'image/jpeg');
        var nombre = this.calcular_nombre("dni");
        var img;
        await this.file.writeFile(this.file.externalRootDirectory + '', nombre, binaryData, { replace: true }).then(data => {
          img = <HTMLImageElement>document.getElementById('img');
        }).catch(data => {
          console.log(data);

        });
        await this.file.checkFile(this.file.externalRootDirectory, nombre).then(async data => {
          this.imagePath = (<any>window).Ionic.WebView.convertFileSrc(this.file.externalRootDirectory + nombre);
          var codeReader = new BrowserPDF417Reader();
          this.mensaje = "Estamos procesando tu Dni...";
          var result = await codeReader.decodeFromImageUrl(this.imagePath).then((data) => {
            console.log("QR_READER" + JSON.stringify(data));
            var datos = data.getText().split("@");
            this.dni = datos[4];
            this.nombre = datos[2] + " " + datos[1];
            this.sexo = datos[3];
            this.valida_dni = true;
            this.file.removeFile(this.file.externalRootDirectory, nombre).then(data => { });
            if (!localStorage.getItem("proceso_alta"))
              localStorage.setItem("proceso_alta", "89296");
            this.mensaje = "Estamos Validando tu identidad...";
            this.renaper.validar_rostro(fotoRostro, this.dni, this.sexo).then(data => {
              console.log("se valida el rostro correctamente.");
              this.validado = true;
              this.mensaje = "Listo tus Fotos se cargaron correctamente.";
              this.imagen = 'assets/img/procesando-success.svg';
              this.claseProcesando = 'procesandofotos-success';
            }).catch(async err => {
              this.mensaje = "Vuelve a sacar la foto de tu rostro ";
              this.imagen = 'assets/img/procesando-error.svg';
              this.reintento = "validaridentidad3";
              this.validado = false
              this.claseProcesando = 'procesandofotos-error';
            });

          }).catch(async err => {
            // const toast = await this.toastController.create({
            //   message: 'por favor reintenta.',
            //   duration: 2000
            // });
            // toast.present();
            console.error("QR_READER" + err);
            this.file.removeFile(this.file.externalRootDirectory, nombre);
            this.mensaje = "Vuelve a sacar la foto del frente de tu dni ";
            this.imagen = 'assets/img/procesando-error.svg';
            this.claseProcesando = 'procesandofotos-error';
            this.reintento = "validaridentidad1";
            this.validado = false;
            this.valida_dni = false;
          });

        }).catch(data => {
          console.log("fallo al verificar archivo");
        });

      }).catch(_ => {
        console.error("File" + JSON.stringify(_));
      })
    }
  }
  Continuar() {
    localStorage.setItem("reintentos", null);
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    p["dni"] = this.dni;
    p["sexo"] = this.sexo;
    p["nombre"] = this.nombre;

    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      },
      replaceUrl: true
    };
    this.navCtrl.navigateForward("datospersonales", navigationExtras);
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
      if (parseInt(reintentos) < 3 || !this.valida_dni) {
        localStorage.setItem("reintentos", (parseInt(reintentos) + 1).toString());
        console.log(reintentos);
      }
      else {
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
    this.reintento = "datospersonales";

    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      },
      replaceUrl: true
    };
    this.navCtrl.navigateRoot(this.reintento, navigationExtras);
  }


}
