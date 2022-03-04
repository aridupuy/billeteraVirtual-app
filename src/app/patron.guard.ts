import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IngresaPinConfirmaPage } from './pages/seguridad/ingresa-pin-confirma/ingresa-pin-confirma.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServiceService } from './service/service.service';
import * as CryptoJS from 'crypto-js';
import { Platform } from '@ionic/angular';
import { IngresaPinPage } from './pages/seguridad/ingresa-pin/ingresa-pin.page';
import { rejects } from 'assert';
import { Observable } from './classes/observable';

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
      console.log("Procesando PIN para "+JSON.stringify(this.platfrom.platforms()));
      if (!this.platfrom.is('mobile') && !this.platfrom.is('android') && !this.platfrom.is('ios')) {
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
      if (this.is_cambioCuenta()) {
        localStorage.setItem("CambioCuenta", "0");
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
          return resolve(true);
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
  from_lastLogin() {
    return (localStorage.getItem("fromlastLogin") == "1")
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
  is_cambioCuenta() {
    return (localStorage.getItem("CambioCuenta") == "1");
  }
  existe_pin() {
    return !(localStorage.getItem("pin") == undefined || localStorage.getItem("pin") == null || localStorage.getItem("pin") == "false")
  }
  async mostrarModal(tipo) {
    localStorage.setItem("modalAbiero", "1");
    switch (tipo) {
      case "crear":
        Observable.suscribe("novalido", async (data) => {
          if(!data){
            var mensaje= "Intenta de nuevo";
          }
          const modal = await this.modalCtrl.create({
            component: IngresaPinPage,
            componentProps: { tipo: "crear",mensaje:mensaje }
          });

          modal.onDidDismiss().then(async (modalDataResponse) => {
            let clave1;
            console.log(modalDataResponse);
            clave1 = modalDataResponse.data;
            const modal = await this.modalCtrl.create({
              component: IngresaPinConfirmaPage
            });
            modal.onDidDismiss().then(async data => {
              if (this.validarClave(clave1, data.data)) {
                this.guardarClave(clave1);
                localStorage.setItem("modalAbiero", "0");
                localStorage.setItem("modalValidado", "1");
                return true;
              }
              await Observable.notify("novalido",false);
            })
            await modal.present();
            Observable.notify("SlashHide", false);
          });
          modal.present();
          Observable.notify("SlashHide", false);
        });
       await Observable.notify("novalido",true);
    break;
      case "validar":
    const modal2 = await this.modalCtrl.create({
      component: IngresaPinPage,
      componentProps: { tipo: "validar" }
    });

    modal2.onDidDismiss().then(async (modalDataResponse) => {
      let clave1;
      console.log(modalDataResponse);
      localStorage.setItem("modalAbiero", "0");
      localStorage.setItem("modalValidado", "1");
      clave1 = modalDataResponse.data;
      // localStorage.setItem("inBackground", "0");
      return true;
    });
    await modal2.present();
    return true;
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
