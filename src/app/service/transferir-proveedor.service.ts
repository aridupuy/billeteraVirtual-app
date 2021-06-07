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
      let postParams = { id_destinatario, currency: 'ARS', monto, descripcion, concepto, emails: { email } };
      this.post<any>('api/transferencia/transferir_proveedor', postParams, httpOptions)
        .subscribe(data => {
          if (data.resultado != null && data.resultado == false) {
              reject(data.log);
          }
          return resolve({data: data.extras[0], log: data.log});
        });
    });
  }



}
