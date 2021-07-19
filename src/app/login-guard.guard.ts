import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from './service/login.service';
import { IngresoPage } from './ingreso/ingreso.page';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public login:LoginService,public router:Router){

  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ){
      //
      var resp = false;
      console.log("Loguin Guard");
      // console.error("Loguin Guard");
      await this.login.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(data=>{
        console.log(data);
        resp=true;
        console.log("voy a ingreso");
        // this.router.navigateByUrl("home");
        return true;
      }).catch(data=>{
        console.log(data);
        localStorage.removeItem("token");
        this.router.navigateByUrl("welcome");
        resp=false;
        return false
      });
      return resp;
  }
  
}
