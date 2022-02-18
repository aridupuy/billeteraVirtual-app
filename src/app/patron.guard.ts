import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IngresaPinConfirmaPage } from './pages/seguridad/ingresa-pin-confirma/ingresa-pin-confirma.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServiceService } from './service/service.service';
import * as CryptoJS from 'crypto-js';
import { Platform } from '@ionic/angular';
import { IngresaPinPage } from './pages/seguridad/ingresa-pin/ingresa-pin.page';

export const pass = "TeganamosCon9";
@Injectable({
  providedIn: 'root'
})


export class PatronGuard implements CanActivate {

  public modalDataResponse: any;

  constructor(public platfrom: Platform, public service: ServiceService, public modalCtrl: ModalController, public router: Router, public navController: NavController) { }
  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return await new Promise(async (resolve, reject) => {
      if (!this.platfrom.is('mobile')) {
        console.log("no es mobile");
        return resolve(true);
      }
      if (!this.is_login()) {
        console.log("no esta logueado");
        return resolve(true);
      }
      if (this.is_abierto()) {
        console.log("esta abierto");
        return resolve(true);
      }
      if (this.is_validado()) {
        console.log("esta validado");
        return resolve(true);
      }
      if(this.is_cambioCuenta()){
        localStorage.setItem("CambioCuenta","0");
        return resolve(true);
      }
      if (this.is_login() && this.existe_pin()) {
        console.log("esta logueado y existe pin");
        await this.mostrarModal("validar").then(data => {
          localStorage.setItem("inBackground", "0");
          return resolve(true);
        }).catch(data => {
          return reject(false);
        });
      }
      else {
        console.log("esta logueado y existe no existe pin");
        await this.mostrarModal("crear").then(data => {
          return  resolve(true);
        }).catch(data => {
          return reject(false);
        });
      }
      if (next.url.toString() == "ingresopatron") {
        console.log("ingresopatron");
        localStorage.setItem("inBackground", "0");
        console.log("false");
      }
    });
  }
  from_lastLogin(){
    return (localStorage.getItem("fromlastLogin") == "1" )
  }
  is_login() {
    return (localStorage.getItem("token") != null && localStorage.getItem("token") != "" && localStorage.getItem("token") != "false")
  }
  is_abierto() {
    return (localStorage.getItem("modalAbiero") == "1")
  }
  is_validado() {
    console.log(localStorage.getItem("modalValidado"));
    return (localStorage.getItem("modalValidado") == "1");
  }
  is_cambioCuenta(){
    return (localStorage.getItem("CambioCuenta")=="1");
  }
  existe_pin() {
    return !(localStorage.getItem("pin") == undefined || localStorage.getItem("pin") == null || localStorage.getItem("pin") == "false")
  }
  async mostrarModal(tipo) {
    localStorage.setItem("modalAbiero","1");
    switch (tipo) {
      case "crear":
        const modal = await this.modalCtrl.create({
          component: IngresaPinPage,
          componentProps: { tipo: "crear" }
        });

        modal.onDidDismiss().then(async (modalDataResponse) => {
          let clave1;
          console.log(modalDataResponse);
          clave1 = modalDataResponse.data;
          const modal = await this.modalCtrl.create({
            component: IngresaPinConfirmaPage
          });
          modal.onDidDismiss().then(data => {
            if (this.validarClave(clave1, data.data)) {
              this.guardarClave(clave1);
              localStorage.setItem("modalAbiero","0");
              localStorage.setItem("modalValidado","1");
              // this.navController.navigateRoot("home");
              return true;
            }
          })
          return await modal.present();

        });
        console.log("aca Modal patron");
        return await modal.present();
      case "validar":
      const modal2 = await this.modalCtrl.create({
        component: IngresaPinPage,
        componentProps: { tipo: "validar" }
      });

      modal2.onDidDismiss().then(async (modalDataResponse) => {
        let clave1;
        console.log(modalDataResponse);
        localStorage.setItem("modalAbiero","0");
        localStorage.setItem("modalValidado","1");
        clave1 = modalDataResponse.data;
        // localStorage.setItem("inBackground", "0");
        return true;
      });
      await modal2.present();
      break;
      default:

        break;
    }

  }
  validarClave(clave1, clave2): Boolean {
    console.log(clave1, clave2);
    if (clave1 === clave2)
      return true;
    return false;
  }
  guardarClave(clave) {
    let claveEnc = this.service.encrypt(clave, pass);
    localStorage.setItem("pin", claveEnc); //esto deberia estar hasheado;
    console.log("clave guardada");
    return true;
  }

}
