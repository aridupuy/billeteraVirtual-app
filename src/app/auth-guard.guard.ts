import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from './service/login.service';
import { IngresoPage } from './ingreso/ingreso.page';
import { PatronGuard } from './patron.guard';
// import { resolve } from '../../platforms/android/cordova/lib/target';
// import { rejects } from 'assert';
import { IngresopatronPage } from './ingresopatron/ingresopatron.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public login:LoginService,public router:Router,public patronGuard:PatronGuard){

  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ){
      //
      console.log("authGuard" +this.router.url);
      var resp :any= false;
      await this.login.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(async (data)=>{
        //resp=true;
        resp = await this.patronGuard.canActivate(next,state);
        console.log(resp + " despues de patronguard");
        if(resp){
          console.log("NO REQUIERE PIN "+next.url);  
          resp = true;
          return resp;  
        }
        console.log("Voy a pin "+next.url);
        console.log("false DEBE INGRESAR PIN");
        // 
        // return true;
        resp = false;
        return resp;
      }).catch(data=>{
        console.log("Voy a welcome! "+next.url);
        localStorage.removeItem("token");
        this.router.navigateByUrl("welcome");
        resp=false;
      });
      // if(this.router.url == "/ingresopatron"){
      //   return true;
      // }
      console.log("llego hasta aca" + this.router.url + " " + resp);
      return resp
  }
  
}
