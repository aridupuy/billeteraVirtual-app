import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { PatronGuard } from './patron.guard';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public login: LoginService, public router: Router, public patronGuard: PatronGuard) {

  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    //
    // console.error("authGuard");
    // console.log("authGuard" + this.router.url);
    var resp: any = false;
    // console.log(AppComponent.CheckedToken);
      await this.login.checkToken("api/checkToken", { token: localStorage.getItem("token") }).then(data => {
        resp = true;
        // console.log("llego hasta aca" + this.router.url + " " + resp);
        localStorage.removeItem("onboarding");
        return true;
      }).catch(data => {
        localStorage.removeItem("token");
        this.router.navigateByUrl("welcome");
        localStorage.clear();
        resp = false;
        return false
      });
    return resp;
  }
}
