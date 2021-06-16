import { ServiceService } from '../service/service.service';
import { pass } from '../patron.guard';
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

@Component({
  selector: 'app-ingresa-pin',
  templateUrl: './ingresa-pin.page.html',
  styleUrls: ['./ingresa-pin.page.scss'],
})
export class IngresaPinPage implements OnInit {
  @ViewChild('passcode1')  passcode1 :ElementRef;
  @ViewChild('passcode2') passcode2 :ElementRef;
  @ViewChild('passcode3') passcode3 :ElementRef;
  @ViewChild('passcode4') passcode4 :ElementRef;

  @ViewChild('passcode1')  passcode11;
  @ViewChild('passcode2') passcode22 ;
  @ViewChild('passcode3') passcode33 ;
  @ViewChild('passcode4') passcode44;
  // @ViewChild('error_code') error_code :HTMLElement;
  public values: any = [];

  // public error_code: any;
  public proposito = "crear";
  public iniciales = "";
  public titulo;
  public titulo2 = "¡Creá tu nuevo  PIN de acceso!";
  
  constructor(private platform: Platform,private faio: FingerprintAIO,public service: ServiceService, public navCtl: NavController, public viewCtrl: ModalController, public route: ActivatedRoute, params: NavParams) {
    this.proposito = params.get("tipo");
    this.platform.backButton.observers.pop();
    this.platform.backButton.subscribeWithPriority(9999, () => { 
      // to disable hardware back button on whole app
      document.addEventListener('backbutton', function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("No se puede cerrar este modal");
      }, false);
      
    });
  }
  public nombre;
  ngOnInit() {
    this.iniciales = localStorage.getItem("iniciales");
    this.nombre = localStorage.getItem("nombre");
    console.log("adentro");
    this.faio.isAvailable().then((result: any) => {
      // console.log(result)
      
      this.faio.show({
        
        cancelButtonTitle: 'Cancelar',
        description: "Usá tus datos biometricos para iniciar sesión e ingresar a la app.",
        disableBackup: false,
        title: 'Hola ' + this.nombre,
        fallbackButtonTitle: 'Atras',
      })
        .then((result: any) => {
          console.log(result);
          this.viewCtrl.dismiss(true);
          // this.navCtl.navigateForward("home");
        })
        
    })
      .catch((error: any) => {
        // this.navCtrl.navigateForward(["ingreso",{}]);
      });
    switch (this.proposito) {
      case "crear":
        this.titulo = "Crea tu Pin";
        break;
      case "validar":
        this.titulo = "Ingresá tu Pin";
        this.titulo2 = "Ingresá tu Pin para continuar"
        break;
    }
  }

  onKeyUp(event, index) {
    if (event.target.value.length != 1) {
      this.setFocus(index - 2);
    } else {
      this.values.push(event.target.value);
      // event.target.type = "password";
      this.setFocus(index);
    }
    event.stopPropagation();
  }
  setFocus(index) {
    index--;
    console.log(index);
    switch (index) {
      case 0:
        this.passcode22.setFocus();
        this.passcode2.nativeElement.setFocus();
        break;
      case 1:
        this.passcode33.setFocus();
        this.passcode3.nativeElement.setFocus();
        break;
      case 2:
        this.passcode44.setFocus();
        this.passcode4.nativeElement.setFocus();
        break;
      case 3:
        this.validarCodigo();
        break;
      default:
        this.passcode1.nativeElement.setFocus();
        this.passcode11.setFocus();
    }
    // console.log(this.clave1+""+this.clave2+""+this.clave3+""+this.clave4+"");
  }
  LostPassword() {
    this.navCtl.navigateForward(["lostpassword", {}]);
  }
  validarCodigo() {
    console.log("aca "+this.proposito);
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
        if (this.validarPin(clave2)) {
          this.viewCtrl.dismiss(clave2);
          this.platform.backButton.observers.pop();
        }
        // this.error_code.classList.remove("activo");
        // this.error_code.classList.add("activo");
        // alert("active")
        break;

    }
  }
  validarPin(clave) {
    let claveEnc = this.service.decrypt(localStorage.getItem("pin"), pass);
    if (claveEnc == clave){
      this.values=[];
      return true;
    }
    else{
      this.values=[];
      return false;
    }
  }
}
