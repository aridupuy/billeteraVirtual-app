import { ServiceService } from '../service/service.service';
import { pass } from '../patron.guard';
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
  // @ViewChild('error_code') error_code :HTMLElement;
  public values: any = [];

  // public error_code: any;
  public proposito = "crear";
  public iniciales = "";
  public titulo;
  public titulo2 = "¡Creá tu nuevo  PIN de acceso!";
  constructor(public service: ServiceService, public navCtl: NavController, public viewCtrl: ModalController, public route: ActivatedRoute, params: NavParams) {
    this.proposito = params.get("tipo");
  }

  ngOnInit() {
    this.iniciales = localStorage.getItem("iniciales");
    console.log("adentro");

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
      this.setFocus(index);
    }
    event.stopPropagation();
  }
  setFocus(index) {
    index--;
    console.log(index);
    switch (index) {
      case 0:
        // this.passcode2.setFocus();
        this.passcode2.nativeElement.setFocus();
        break;
      case 1:
        // this.passcode3.setFocus();
        this.passcode3.nativeElement.setFocus();
        break;
      case 2:
        // this.passcode4.setFocus();
        this.passcode4.nativeElement.setFocus();
        break;
      case 3:
        this.validarCodigo();
        break;
      default:
        this.passcode1.nativeElement.setFocus();
        // this.passcode1.setFocus();
    }
    // console.log(this.clave1+""+this.clave2+""+this.clave3+""+this.clave4+"");
  }
  LostPassword() {
    this.navCtl.navigateForward(["lostpassword", {}]);
  }
  validarCodigo() {
    console.log("aca");
    switch (this.proposito) {
      case "crear":
        let clave = "";
        this.values.forEach(valor => {
          clave += "" + valor;
        });

        // this.navCtrl.navigateForward("ingresa-pin-confirma", navigationExtras);
        this.viewCtrl.dismiss(clave);
        break;
      case "validar":
        let clave2 = "";
        this.values.forEach(valor => {
          clave2 += "" + valor;
        });
        if (this.validarPin(clave2)) {
          this.viewCtrl.dismiss(clave2);
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
