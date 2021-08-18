import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from './service/login.service';
import { IngresoPage } from './ingreso/ingreso.page';
import { AppComponent } from './app.component';

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
      console.log("LOGIN  GUARD");
      await this.login.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(data=>{
        console.log(data);
        resp=false;
        console.log("voy a ingreso");
        AppComponent.splash=false;
        this.router.navigateByUrl("home");
        return false;
      }).catch(data=>{
        console.log(data);
        localStorage.removeItem("token");
        // this.router.navigateByUrl("welcome");
        resp=true;
        AppComponent.splash=false;
        return true
      });
      AppComponent.splash=false;
      return resp;
  }
  
}
