import { Tarjeta } from './../models/tarjeta';
import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Injectable } from '@angular/core';
interface saldo {
  resultado: any;
  log: any;
  extras : [
        { saldo_actual:any,saldo_no_liquidado:any,saldo_disponible:any }
  ]
}
var httpOptions = {

  headers: { 'Content-Type': 'application/json','token':localStorage.getItem("token") }

};
@Injectable({
  providedIn: 'root'
})
export class SaldoService extends ServiceService {
  
  //URL = "http://localhost:358/";

  obtener(){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<saldo>('api/saldo/obtener_saldo',httpOptions).subscribe((data) => {
        console.log(data);
        if (data.log != null && data.log != false) {
          reject(data.log);
        }
        return resolve(data.extras[0].saldo_actual);
      });
    });
  }

  obtener_all(){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<saldo>('api/saldo/obtener_saldo',httpOptions).subscribe((data) => {
        console.log(data);
        if (data.log != null && data.log != false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }

  recargar_saldo_td(monto,tarjeta){
    console.log("recarga_td");
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      if(!tarjeta){
        reject(false);
      }
      var postParams = {id_tarjeta: tarjeta.id , monto: monto};
      this.post<any>('api/saldo/recargar_saldo_td',postParams,httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data);
        }
        return resolve(data);
      });
    });
  }
}
