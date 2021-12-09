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
              }
        }
  ]
}
@Injectable({
  providedIn: 'root'
})
export class InicioProcesoService extends ServiceService{

  iniciar(token,email){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      this.post<proceso>('api/procesoalta/iniciar',{email:email},httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        
        return resolve(data.extras[0].data);
      });
    });
  }
}
