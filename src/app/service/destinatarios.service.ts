import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
let httpOptions = {

  headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') }

};

@Injectable({
  providedIn: 'root'
})
export class DestinatariosService  extends ServiceService {

  public obtener_destinatarios(){
    return new Promise((resolve,reject ) => {
      httpOptions.headers.token = localStorage.getItem('token');
      this.get<any>('api/destinatario/obtener_destinatarios', httpOptions)
        .subscribe(data => {
          if (data.resultado != null && data.resultado == false) {
              reject(data.log);
          }
          return resolve({data: data.extras[0], log: data.log});
        });
    });
  }
}
