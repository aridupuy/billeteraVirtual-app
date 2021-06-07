import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
interface IBarcode{
  resultado: any;
  log: any;
  extras: any;
}
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
      this.post<IBarcode>('api/efectivo/obtener_barra', postParams, httpOption)
        .subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            rejects(data.log);
          }
          return resolve(data.extras[0]);
        }) ;
    });
    
  }
 
}
