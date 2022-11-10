import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { PatronGuard } from './patron.guard';
import { AppComponent } from './app.component';
import { Observable } from './classes/observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public login: LoginService, public router: Router, public patronGuard: PatronGuard) {

  }
  // async canActivate() {
  //   //
  //     console.log("authGuard" + this.router.url);
  //     var resp: any = false;
  //     this.login.checkToken("api/checkToken", { token: localStorage.getItem("token") }).then(async (data) => {
  //     resp=true;
  //     console.log("llego hasta aca" + this.router.url + " " + resp);
  //     return (resp);
  //   })
  //     .catch(data => {
  //         localStorage.removeItem("token");
  //         this.router.navigateByUrl("welcome");
  //         resp = false;
  //         return(resp);
  //   });
  // }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    //
    console.log("authGuard" + this.router.url);
    var resp: any = false;
    Observable.suscribe("error_token",(data)=>{
        console.log("activo error_token");
        this.borrar_data();
    });
    await this.login.checkToken("api/checkToken", { token: localStorage.getItem("token") }).then(data => {
      resp = true;
      console.log("llego hasta aca" + this.router.url + " " + resp);
      localStorage.removeItem("onboarding");
      AppComponent.login=true;
      return true;
    }).catch(data => {
      console.log("sale por error");
      console.log(data);
      console.log("cierro sesion");
      Observable.notify("error_token","");
      resp = false;
      return false
    });
    return resp;
  }

  borrar_data(){
    localStorage.removeItem("token");
      this.router.navigateByUrl("welcome");
      let varsOnboarding = localStorage.getItem("varsOnboarding");
      let onboardingLastPage = localStorage.getItem("onboardingLastPage");
      let validaciones = localStorage.getItem("validaciones");
      let onboarding= localStorage.getItem("onboarding");
      let proceso_alta= localStorage.getItem("proceso_alta");

      localStorage.clear();

      localStorage.setItem("varsOnboarding",varsOnboarding);
      localStorage.setItem("onboardingLastPage",onboardingLastPage);
      localStorage.setItem("validaciones",validaciones);
      localStorage.setItem("onboarding",onboarding);
      localStorage.setItem("proceso_alta",proceso_alta);
      
      AppComponent.login=false;
      
  }
}
