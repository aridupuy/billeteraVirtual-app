import { NavController } from '@ionic/angular';
import { ContactoService } from './service/contacto.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoGuardGuard implements CanActivate {
  constructor(public Contacto:ContactoService, public navCtrl: NavController){

  }
  async canActivate(
   next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    var resultado=true;
    let  p  = JSON.parse(next.queryParamMap.get("param"));
    console.log("en el guard pago");
    console.log(p);
    switch(p.deuda.tipo_deuda){
      case "Contacto":
        console.log("Contacto detectado");
        await this.Contacto.activo(p.deuda.id).then(data=>{
          console.log("activo");
          resultado=true;
        })
        .catch(err=>{
          console.log("No disponible");
          this.navCtrl.back();
          resultado=false;       
        });
        break;
    }
    console.log("termina");
    console.log(resultado);
    return resultado;
  }
  
}
