import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';

interface Isopote {
  resultado: boolean
  log: any,
  extras: any[]
}
var httpOptions = {

  headers: { 'token': "", responseType: 'json' }

};

@Injectable({
  providedIn: 'root'
})

export class SoporteService extends ServiceService {
  enviarsoporte(mensaje,pantalla,proceso_alta,token) {
    httpOptions.headers.token =token;
    var postParams = ({ mensaje: mensaje,proceso_alta:proceso_alta,pantalla:pantalla });
    return new Promise((resolve, reject) => {
      console.log(postParams);
      this.post<Isopote>('api/soporte/enviar',postParams, httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
}
