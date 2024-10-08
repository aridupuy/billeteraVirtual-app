import { pass } from '../../../patron.guard';
import { ServiceService } from '../../../service/service.service';
import { Platform } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { asNativeElements } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
// import { ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { variable } from '@angular/compiler/src/output/output_ast';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
// import { setTimeout } from 'timers';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-ingresa-pin',
  templateUrl: './ingresa-pin.page.html',
  styleUrls: ['./ingresa-pin.page.scss'],
})
export class IngresaPinPage implements OnInit {
  @ViewChild('ingreso1') passcode1;
  @ViewChild('ingreso2') passcode2;
  @ViewChild('ingreso3') passcode3;
  // @ViewChild('ingreso4') passcode4:HTMLElement ;
  @ViewChild('ingreso4') passcode4;

  // @ViewChild('passcode1')  passcode11;
  // @ViewChild('passcode2') passcode22 ;
  // @ViewChild('passcode3') passcode33 ;
  // @ViewChild('passcode4') passcode44;
  @ViewChild('shakeit') shakeit;
  public values: any = [];

  // public error_code: any;
  public proposito = "crear";
  public mensaje = "crear";
  public iniciales = "";
  public titulo;
  public titulo2 = "¡Creá tu nuevo  PIN de acceso!";
  public pago = false;
  public conHuella = false;
  constructor(private platform: Platform, private faio: FingerprintAIO, public service: ServiceService, public loginService: LoginService, public navCtl: NavController, public viewCtrl: ModalController, public route: ActivatedRoute, params: NavParams) {
    this.proposito = params.get("tipo");
    this.mensaje = params.get("mensaje");
    this.pago = params.get("pago");

    this.platform.backButton.observers.pop();
    this.platform.backButton.subscribeWithPriority(9999, () => {
      // to disable hardware back button on whole app
      document.addEventListener('backbutton', function (event) {
        event.preventDefault();
        event.stopPropagation();
        // console.log("No se puede cerrar este modal");
      }, false);

    });
    this.faio.isAvailable().then(data=>{
      this.conHuella=true;
    }).catch(err=>{
      this.conHuella=false;
    })
  }
  public nombre;


  ngOnInit() {
    this.iniciales = localStorage.getItem("iniciales");
    this.nombre = localStorage.getItem("nombre");
    // console.log("adentro");

    switch (this.proposito) {
      case "crear":
        this.titulo = "Crea tu Pin";
        if(this.mensaje!=undefined){
          this.titulo=this.mensaje;
          this.titulo2="¡Intenta de nuevo!"
        }

        break;
      case "validar":
        console.log("validar");
        this.validarHuella();
        this.titulo = "Ingresá tu Pin";
        this.titulo2 = "Ingresá tu Pin para continuar"
        break;
    }
  }
  volver() {
    // console.log("volver");
    // console.log(this.pago)
    if (this.pago.toString() == 'true') {
      this.viewCtrl.dismiss(false);
    }
  }
  onKeyUp(event, index) {
    // if (event.target.value.length != 1) {
    //   this.setFocus(index - 2);
    // } else {
    this.values.push(index);
    // event.target.type = "password";
    if (index == "borrar") {
      this.setFocus("borrar");
      this.values = [];
    }
    else if (this.values.length == 4) {
      this.setFocus(this.values.length);
      this.validarCodigo();
    }
    else
      this.setFocus(this.values.length);
    // console.log(this.values);
    event.stopPropagation();
  }
  setFocus(index) {
    index--;
    // console.log(index);
    switch (index) {
      case 0:
        // this.
        this.passcode1.nativeElement.classList.toggle("confirm");
        // this.passcode22.setFocus();
        // this.passcode2.nativeElement.setFocus();
        break;
      case 1:
        this.passcode2.nativeElement.classList.toggle("confirm");
        // this.passcode33.setFocus();
        // this.passcode3.nativeElement.setFocus();
        break;
      case 2:
        this.passcode3.nativeElement.classList.toggle("confirm");
        // this.passcode44.setFocus();
        // this.passcode4.nativeElement.setFocus();
        break;
      case 3:
        this.passcode4.nativeElement.classList.toggle("confirm");
        // this.passcode44.setFocus();
        // this.passcode4.nativeElement.setFocus();
        break;
      default:
        this.passcode1.nativeElement.classList.remove("confirm");
        this.passcode2.nativeElement.classList.remove("confirm");
        this.passcode3.nativeElement.classList.remove("confirm");
        this.passcode4.nativeElement.classList.remove("confirm");
        // this.passcode44.setFocus();
        // this.passcode4.nativeElement.setFocus();
        break;

      // this.passcode1.nativeElement.setFocus();
      // this.passcode11.setFocus();
    }
    // console.log(this.clave1+""+this.clave2+""+this.clave3+""+this.clave4+"");
  }
  LostPassword() {
    this.navCtl.navigateForward(["logout", {}]);
  }
  validarCodigo() {
    // console.log("aca "+this.proposito);
    this.shakeit.nativeElement.classList.remove("shakeit");
    switch (this.proposito) {
      case "crear":
        let clave = "";
        this.values.forEach(valor => {
          clave += "" + valor;
        });
        // this.navCtrl.navigateForward("ingresa-pin-confirma", navigationExtras);
        this.viewCtrl.dismiss(clave);
        this.platform.backButton.observers.pop();
        break;
      case "validar":
        let clave2 = "";
        this.values.forEach(valor => {
          clave2 += "" + valor;
        });
        this.limpiar_puntos();
        if (this.validarPin(clave2)) {
          this.viewCtrl.dismiss(clave2);
          this.platform.backButton.observers.pop();
        }
        else {

          this.shakeit.nativeElement.classList.add("shakeit");
          setTimeout(() => {
            this.shakeit.nativeElement.classList.remove("shakeit");
          }, 992);

        }
        // alert("active")
        break;

    }
  }
  limpiar_puntos() {
    this.passcode1.nativeElement.classList.remove("confirm");
    this.passcode2.nativeElement.classList.remove("confirm");
    this.passcode3.nativeElement.classList.remove("confirm");
    this.passcode4.nativeElement.classList.remove("confirm");
  }

  validarPin(clave) {
    let claveEnc = this.service.decrypt(localStorage.getItem("pin"), pass);
    if (claveEnc == clave) {
      this.loginService.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(()=>console.log()).catch(()=>console.log());
      this.values = [];
      return true;
    }
    else {
      this.values = [];
      return false;
    }
  }

  validarHuella() {
    if (localStorage.getItem("conDatoBiometrico") == "si")
      this.faio.isAvailable().then((result: any) => {
        console.log(result)
        console.log("muestro datos biometricos");
        this.conHuella = true;
        this.faio.show({
          // cancelButtonTitle: 'Cancelar',
          description: "Usá tus datos biometricos para iniciar sesión e ingresar a la app.",
          disableBackup: false,
          title: 'Hola ' + this.nombre,
          fallbackButtonTitle: 'Atras',
        })
          .then((result: any) => {
            this.loginService.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(()=>console.log()).catch(()=>console.log());
            this.shakeit.nativeElement.classList.add("shakeit");
            this.passcode1.nativeElement.classList.add("confirm");
            this.passcode2.nativeElement.classList.add("confirm");
            this.passcode3.nativeElement.classList.add("confirm");
            this.passcode4.nativeElement.classList.add("confirm");
            setTimeout(() => {
              this.shakeit.nativeElement.classList.remove("shakeit");
              this.limpiar_puntos();
              this.viewCtrl.dismiss(true);
            }, 50);
            // console.log(result);
            // this.navCtl.navigateForward("home");
          })
          .catch(err => {
            console.log(err);
          });

      })
        .catch((error: any) => {
          console.log("error this.faio.show()");
          // this.navCtrl.navigateForward(["ingreso",{}]);
        });
  }
}
