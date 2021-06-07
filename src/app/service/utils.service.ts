import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';

var httpOptions = {

  headers: { 'token':"" ,responseType: 'json' }

};
@Injectable({
  providedIn: 'root'
})
export class UtilsService extends ServiceService {
obtener_datos_entidad(id_entidad,id_referencia){
    httpOptions.headers.token=localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        let postParams ={id_entidad:id_entidad,id_referencia:id_referencia};
        this.post<any>('api/utils/obtener_datos_entidad',postParams,httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    }
}
