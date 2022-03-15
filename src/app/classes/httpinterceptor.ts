import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { error } from 'protractor';
import { AppComponent } from '../app.component';
import { NavController } from '@ionic/angular';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class Httpinterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,public NavCtrl:NavController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);
    console.log("INTERCEPTOR");
    console.log(timeoutValueNumeric);
    return next.handle(req).pipe(timeout(timeoutValueNumeric), catchError(error => {
        console.log(error);
        console.log("ACAAAAAA!");
        AppComponent.cargando = false;
        let json = JSON.parse(JSON.stringify([{ respuesta: false, log: "TimeOut Error", data: [] }]));
        this.NavCtrl.navigateRoot("errortimeout");
        return json as unknown as Observable<any>;
        // return [];
      }))
  }
}