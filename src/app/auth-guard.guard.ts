import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from './service/login.service';
import { IngresoPage } from './ingreso/ingreso.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public login:LoginService,public router:Router){

  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ){
      //
      var resp = false;
      await this.login.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(data=>{
        resp=true;
        return true;
      }).catch(data=>{
        localStorage.removeItem("token");
        this.router.navigateByUrl("welcome");
        resp=false;
        return false
      });
      return resp;
  }
  
}
