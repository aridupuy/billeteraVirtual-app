import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ValidacionCelService } from './service/validacion-cel.service';
import { NavController } from '@ionic/angular';
import { ProcesoEstadoService } from './service/proceso-estado.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
export interface datosProceso {
  valida_mail: Boolean | any,
  valida_ident: Boolean | any,
  valida_cel: Boolean | any,
  estado_cuenta: any,
  cel: any,
  mail: any
  id_proceso_alta_usuario:number,
  id_proceso_alta:number
}

@Injectable({
  providedIn: 'root'
})
export class ProcesoAltaGuard implements CanActivate {
  CANTIDAD = 5;
  DIAS = 15;
  constructor(public proceso: ProcesoEstadoService, public validCel: ValidacionCelService, public router: Router, public navCtrl: NavController) {
    console.log("PROCESOALTAGUARD");
  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    var resp;
    let val = Cookie.get("validador");
    if (!next.queryParamMap.has("param")) {
      console.log("aca2");
      if (val == undefined) {
        Cookie.set("validador", (0).toString(), this.DIAS);
      }
      var validador = parseInt(Cookie.get("validador"));
      // if (validador >= this.CANTIDAD) {
      //   return true;
      // }
      await this.proceso.validar().then(async (data: datosProceso) => {
        console.log("DATA PROCESO ALTA");
        console.log(data);
        localStorage.setItem("proceso_alta",data.id_proceso_alta_usuario.toString());

       

        // else if (data.estado_cuenta!=1 &&(!data.valida_mail || data.valida_mail == 'f')) {
        if ((!data.valida_mail || data.valida_mail == 'f' || data.valida_mail == null)) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ id_proceso_alta:data.id_proceso_alta,id_proceso_alta_usuario:data.id_proceso_alta_usuario,login: true, valida_mail: true, Mensaje: "Tienes que validar tu Correo para operar" })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = false
        }
        // else if (data.estado_cuenta!=1 &&(!data.valida_cel || data.valida_cel == 'f')) {
        else if ((!data.valida_cel || data.valida_cel == 'f'  || data.valida_cel == null)) {
          await this.validCel.reenviar_codigo().then((cel) => {
            
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({ id_proceso_alta:data.id_proceso_alta,id_proceso_alta_usuario:data.id_proceso_alta_usuario,login: true, valida_cel: true, Mensaje: "Tienes que validar tu Celular para operar", revalidar: true, cod_area: "", celular: cel })
              }
            };
            this.navCtrl.navigateForward("home", navigationExtras);

          });
        }
        else if ((data.valida_ident == null || data.valida_ident == undefined || data.valida_ident == 'f')) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ id_proceso_alta:data.id_proceso_alta,id_proceso_alta_usuario:data.id_proceso_alta_usuario,login: true, valida_ident: true, Mensaje: "Tienes que validar tu Identidad para operar" })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        else if (data.estado_cuenta != 1 && (!data.valida_ident || data.valida_ident == 'f')) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({id_proceso_alta:data.id_proceso_alta,id_proceso_alta_usuario:data.id_proceso_alta_usuario, login: true, valida_ident: true, Mensaje: "Tienes que validar tu Identidad para operar" })
            }
          }; //parametros para el nav
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        else if (data.estado_cuenta == 4) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ id_proceso_alta:data.id_proceso_alta,id_proceso_alta_usuario:data.id_proceso_alta_usuario,login: true, valido: false, validacion_manual:true,Mensaje: "Tu cuenta ha sido bloqueada, por favor ponete en contacto con nosotros." })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        else if (data.estado_cuenta == 6) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ id_proceso_alta:data.id_proceso_alta,id_proceso_alta_usuario:data.id_proceso_alta_usuario,login: true, valido: false,validacion_manual:true, Mensaje: "Tu cuenta se encuentra en validacion manual, en 72hs tus datos seran procesados." })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        else {
          validador += 1;
          resp = true
        }
        Cookie.set("validador", validador.toString(), this.DIAS);
        return resp;
      }).catch(err => {
        console.log(err);
        if (err == "El token es invalido") {
          this.navCtrl.navigateForward("home");
          return true;
        }

        return false;
      });
    }
    else {
      console.log("sale por true");
      return true;
    }
    console.log(resp);

    return resp;
  }

}
