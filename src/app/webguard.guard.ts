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
    if(this.platform.is("desktop") && !this.platform.is("android") && !this.platform.is("ios")){
        
        return this.route.navigateByUrl("ingreso");
    }
    return true;
    
  }
  
}
