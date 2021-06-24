import { ServiceService } from './service.service';
import { IRESTBarcode } from '../interfaces/Ibarcode';
import { Injectable } from '@angular/core';

const httpOption = {

  headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") }


};
@Injectable({
  providedIn: 'root'
})
export class CargarEfectivoService extends ServiceService{

  public obtener_barcode(monto){
    httpOption.headers.token = localStorage.getItem("token");
    return new Promise((resolve, rejects ) => { 
      var postParams = { monto: monto};
      this.post<IRESTBarcode>('api/efectivo/obtener_barra', postParams, httpOption)
        .subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            rejects(data.log);
          }
          return resolve(data.extras[0]);
        }) ;
    });
    
  }
  public obtener_barcode_tc(){
    httpOption.headers.token = localStorage.getItem("token");
    return new Promise((resolve, rejects ) => { 
      this.get<IRESTBarcode>('api/efectivo/obtener_barra_tc', httpOption)
        .subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            rejects(data.log);
          }
          return resolve(data.extras[0]);
        }) ;
    });
    
  }
 
}
