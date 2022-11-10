import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IngresoPage } from './ingreso/ingreso.page';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WebguardGuard implements CanActivate {
  constructor(public platform:Platform,public route:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i))
      {
        return true;
      }  
    // if(this.platform.is("desktop") && !this.platform.is("android") && !this.platform.is("ios")){
      else{
        return this.route.navigateByUrl("ingreso");
    }
    return true;
    
  }
  
}
