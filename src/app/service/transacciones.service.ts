import { ServiceService } from './service.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'
//import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from './../../environments/environment';

interface moves {
  resultado: any;
  log: any;
  extras : [
        { moves:any }
  ]
}
var httpOptions = {

  headers: { 'token':"" ,responseType: 'json' }

};
@Injectable({
  providedIn: 'root'
})export class TransaccionesService extends ServiceService {

  URL = environment.URL;
  //URL = "http://172.20.10.80:358/";



  //  constructor(private http: HttpClient) { }

  public obtener_transacciones(offset:number,limit:number) {
    // console.log(limit,offset);
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({ limit: limit, offset: offset });
      this.post<moves>('api/movimientos/consultar_movimientos',postParams,httpOptions).subscribe((data) => {
        if (data.log != null && data.log != false) {
          reject(data.log);
        }
        return resolve(data.extras[0].moves);
      });
    });
  }
  
  public obtener_transacciones_filtrado(desde: any, hasta: any, mp:any,limit:number,offset:number,token: any) {
    return new Promise((resolve, reject) => {
      var postParams = ({ desde: desde, hasta: hasta,mp:mp,limit:limit,offset:offset });
      this.post<moves>('api/movimientos/consultar_movimientos',postParams,httpOptions).subscribe((data) => {
        if (data.log != null && data.log != false) {
          reject(data.log);
        }
        return resolve(data.extras[0].moves);
      });
    });
  }

  

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log("mensaje: " + message);
  }
}