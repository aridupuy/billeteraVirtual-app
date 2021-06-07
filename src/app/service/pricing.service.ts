import { IPricing } from './../interfaces/IPricing';
import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
var httpOptions = {

  headers: { 'Content-Type': 'application/json', "token": "" }

};
@Injectable({
  providedIn: 'root'
})
export class PricingService extends ServiceService{
    
    obtener_comisiones(monto,tipoDeuda){
      httpOptions.headers.token=localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        var postParams = ({ monto:monto,tipoDeuda:tipoDeuda });
        this.post<IPricing>('api/comisiones/calcular_comisiones',postParams,httpOptions).subscribe((data) => {
          if (data.resulado != null && data.resulado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    }

}
