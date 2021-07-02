import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ValidacionCelService } from './service/validacion-cel.service';
import { NavController } from '@ionic/angular';
import { ProcesoEstadoService } from './service/proceso-estado.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Validaridentidad1Page } from './validaridentidad1/validaridentidad1.page';
interface datosProceso {
  valida_mail: Boolean | any,
  valida_ident: Boolean | any,
  valida_cel: Boolean | any,
  estado_cuenta:any,
  cel:any,
  mail:any
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
        console.log(data);

        if(data.estado_cuenta==4){
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ login: true, Mensaje: "Tu cuenta ha sido bloqueada, por favor ponete en contacto con nosotros." })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        else if(data.estado_cuenta==6){
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ login: true, Mensaje: "Tu cuenta se encuentra en validacion manual, en 72hs tus datos seran procesados." })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        else if (data.estado_cuenta!=1 &&(data.valida_ident == null || data.valida_ident == undefined)) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ login: true,valida_ident:true, Mensaje: "Tienes que validar tu Identidad para operar" })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        else if (data.estado_cuenta!=1 &&(!data.valida_ident || data.valida_ident == 'f')) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ login: true,valida_ident:true, Mensaje: "Tienes que validar tu Identidad para operar" })
            }
          }; //parametros para el nav
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = true
        }
        // else if (data.estado_cuenta!=1 &&(!data.valida_mail || data.valida_mail == 'f')) {
          else if ((!data.valida_mail || data.valida_mail == 'f')) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ login: true,valida_mail:true, Mensaje: "Tienes que validar tu Correo para operar" })
            }
          };
          this.navCtrl.navigateForward("home", navigationExtras);
          resp = false
        }
        // else if (data.estado_cuenta!=1 &&(!data.valida_cel || data.valida_cel == 'f')) {
          else if ((!data.valida_cel || data.valida_cel == 'f')) {
          await this.validCel.reenviar_codigo().then((cel) => {
            console.log(cel);
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({ login: true,valida_cel:true, Mensaje: "Tienes que validar tu Celular para operar",revalidar:true,cod_area:"",celular:cel})
              }
            };
            this.navCtrl.navigateForward("confirmasms", navigationExtras);

          });
        }
        else {
          validador += 1;
          resp = true
        }
        Cookie.set("validador", validador.toString(), this.DIAS);
        return resp;
      }).catch(data=>{
        console.log("PROCESO_ALTA");
        this.navCtrl.navigateRoot("home");
      });
    }
    else{
      return true;
    }
    return resp;
  }

}
