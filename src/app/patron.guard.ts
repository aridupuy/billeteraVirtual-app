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

export const pass = "TeganamosCon9";
@Injectable({
  providedIn: 'root'
})


export class PatronGuard implements CanActivate {

  public modalDataResponse: any;

  constructor(public service: ServiceService, public modalCtrl: ModalController, public router: Router, public navController: NavController) { }
  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>  {
      
     return await new Promise(async (resolve, reject)  => {
      // this.backgroundMode.enable();
      // if(this.backgroundMode.isActive()){
      //   // this.backgroundMode.on('activate', ()=>{

      //   // });
      console.log("patron guard");
      // this.backgroundMode.isScreenOff(() => {
      //   console.log("MINIMIZE DETECTED");
      //   localStorage.setItem("inBackground", "1");
      // });
      // }
      if (localStorage.getItem("inBackground") == null || localStorage.getItem("inBackground") == "1") {

        console.log("Debe ingresar el patron " + next.url);
        // let params = navigationExtras 
        // this.router.navigateByUrl("ingresopatron");
        if (localStorage.getItem("pin") == undefined || localStorage.getItem("pin") == null) {
          await this.mostrarModal("crear").then(data => {
            console.log("crear");
            // localStorage.setItem("inBackground", "0");
            resolve(true);
          }).catch(data => {
            reject (false);
          });
        }
        else {
          console.log("va a validar");
          await this.mostrarModal("validar").then(data => {
            console.log("valida true");
            resolve(true);

          }).catch(data => {
            console.log("valida false");
            reject(false);

          });
        }
        if (next.url.toString() == "ingresopatron") {
          console.log("ingresopatron");
          localStorage.setItem("inBackground", "0");
          console.log("false");

        }

        // return true;
      }
      else{
        console.log("no requiere auth");
      }
      console.log("true aca");
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
          console.log(modalDataResponse);
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
          clave1 = modalDataResponse.data;
          localStorage.setItem("inBackground", "0");
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
