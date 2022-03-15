import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
let httpOptions = {

  headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') }

};

@Injectable({
  providedIn: 'root'
})
export class TransferirProveedorService extends ServiceService {

  public transferir_proveedor(id_destinatario, monto, descripcion, concepto, email) {
    return new Promise((resolve,reject ) => {
      httpOptions.headers.token = localStorage.getItem('token');
      let postParams = { id_destinatario:id_destinatario, currency: 'ARS', monto:monto, descripcion:descripcion, concepto:concepto, emails: { email } };
      // console.log(postParams);
      this.post<any>('api/transferencia/transferir_proveedor', postParams, httpOptions)
        .subscribe(data => {
          if (data.resultado != null && data.resultado == false) {
              reject(data);
          }
          return resolve({data: data.extras[0], log: data.log});
        });
    });
  }
  public ultimas_transferencias() {
    return new Promise((resolve,reject ) => {
      httpOptions.headers.token = localStorage.getItem('token');
      this.get<any>('api/transferencia/ultimas_transferencias',httpOptions)
        .subscribe(data => {
          if (data.resultado != null && data.resultado == false) {
              reject(data.log);
          }
          return resolve(data.extras[0]);
        });
    });
  }
  



}
