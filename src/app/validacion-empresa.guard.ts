import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ValidacionCelService } from './service/validacion-cel.service';
import { NavController } from '@ionic/angular';
import { ProcesoEstadoService } from './service/proceso-estado.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { datosProceso } from './proceso-alta.guard';
@Injectable({
  providedIn: 'root'
})
export class ValidacionEmpresaGuard implements CanActivate {
  CANTIDAD = 5;
  DIAS = 15;
  constructor(public proceso: ProcesoEstadoService, public validCel: ValidacionCelService, public router: Router, public navCtrl: NavController) {
    console.log("ValidacionEmpresa");
  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      var resp=true;
      console.log("ValidacionEmpresa Activate");
      if (!next.queryParamMap.has("param")) {
        var validador = parseInt(Cookie.get("validador"));
        await this.proceso.validar().then(async (data: datosProceso) => {
          console.log(data.estado_cuenta);
          if(data.estado_cuenta==30){
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({ login: true,valida_empresa:true , mensaje: "Todavia falta un paso mas, revisa tu mail y segui los pasos."})
              }
            };
            this.navCtrl.navigateForward("home", navigationExtras);
            resp = true
          }
          return resp;
        }).catch(err=>{
          console.log(err);
          if(err=="El token es invalido"){
            this.navCtrl.navigateForward("home");
            return true;
          }
            
          return false;
        });
      }
      console.log("ValidacionEmpresa DEActivate");
      return resp;
    }
}
