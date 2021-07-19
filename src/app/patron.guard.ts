import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IngresaPinPage } from './ingresa-pin/ingresa-pin.page';
import { IngresaPinConfirmaPage } from './ingresa-pin-confirma/ingresa-pin-confirma.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServiceService } from './service/service.service';
import * as CryptoJS from 'crypto-js';
import { Platform } from '@ionic/angular';

export const pass = "TeganamosCon9";
@Injectable({
  providedIn: 'root'
})


export class PatronGuard implements CanActivate {

  public modalDataResponse: any;

  constructor(public platfrom:Platform,public service: ServiceService, public modalCtrl: ModalController, public router: Router, public navController: NavController) { }
  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return await new Promise(async (resolve, reject) => {
      // alert(this.platfrom.is('mobile'));
      if (this.platfrom.is('mobile') && localStorage.getItem("token") != null && localStorage.getItem("token")!=""){
        if (localStorage.getItem("inBackground") == null || localStorage.getItem("inBackground") == "1") {
          if (localStorage.getItem("pin") == undefined || localStorage.getItem("pin") == null) {
            await this.mostrarModal("crear").then(data => {
              resolve(true);
            }).catch(data => {
              reject(false);
            });
          }
          if (next.url.toString() == "ingresopatron") {
            // console.log("ingresopatron");
            localStorage.setItem("inBackground", "0");
            // console.log("false");
          }
        }
      }
      resolve(true);
    })
    
  }

  async mostrarModal(tipo) {
    switch (tipo) {
      case "crear":
        const modal = await this.modalCtrl.create({
          component: IngresaPinPage,
          componentProps: { tipo: "crear" }
        });

        modal.onDidDismiss().then(async (modalDataResponse) => {
          let clave1;
          // console.log(modalDataResponse);
          clave1 = modalDataResponse.data;
          const modal = await this.modalCtrl.create({
            component: IngresaPinConfirmaPage
          });
          modal.onDidDismiss().then(data => {
            if (this.validarClave(clave1, data.data)) {
              this.guardarClave(clave1);
              // this.navController.navigateRoot("home");
              return true;
            }
          })
          return await modal.present();

        });
        // console.log("aca Modal patron");
        return await modal.present();
      case "validar":
      // const modal2 = await this.modalCtrl.create({
      //   component: IngresaPinPage,
      //   componentProps: { tipo: "validar" }
      // });

      // modal2.onDidDismiss().then(async (modalDataResponse) => {
      //   let clave1;
      //   console.log(modalDataResponse);
      //   clave1 = modalDataResponse.data;
      //   localStorage.setItem("inBackground", "0");
      //   return true;
      // });
      // await modal2.present();
      // break;
      default:

        break;
    }

  }
  validarClave(clave1, clave2): Boolean {
    // console.log(clave1, clave2);
    if (clave1 === clave2)
      return true;
    return false;
  }
  guardarClave(clave) {
    let claveEnc = this.service.encrypt(clave, pass);
    localStorage.setItem("pin", claveEnc); 
    // console.log("clave guardada");
    return true;
  }

}
