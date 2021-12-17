import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var httpOptions = {

  headers: { 'Content-Type': 'application/json' ,"token":""}

};
interface proceso {
  resultado: any;
  log: any;
  extras : [
        {
          data:
              {
                id_proceso_alta:any 
                validaciones:any,
              }
        }
  ]
}
@Injectable({
  providedIn: 'root'
})
export class InicioProcesoService extends ServiceService{

  iniciar(token,usuario,pfpj){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      this.post<proceso>('api/procesoalta/iniciar',{usuario:usuario,pfpj:pfpj},httpOptions).subscribe((data) => {
        console.log(data);
        if (data.resultado != null && data.resultado == false) {
          return reject(data.log);
        }
        return resolve(data.extras[0].data);
      });
    });
  }

  validar_estado(token,id_proceso_alta){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      this.post<proceso>('api/procesoalta/validar',{id_proceso_alta:id_proceso_alta},httpOptions).subscribe((data) => {
        console.log(data);
        if (data.resultado != null && data.resultado == false) {
          return reject(data.log);
        }
        
        return resolve(data.extras[0].data.validaciones);
      });
    });
  }
}
