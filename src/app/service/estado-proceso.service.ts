import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
const httpOption = {

  headers: { 'Content-Type': 'application/json' ,token:""}

};
@Injectable({
  providedIn: 'root'
})
export class EstadoProcesoService extends ServiceService {

  obtener(id) {

    httpOption.headers.token = localStorage.getItem('token');
    var postParams = { id: id };
    return new Promise((resolve, reject) => {
      this.post<any>('api/EstadoProceso/obtener', postParams, httpOption).subscribe((data: any) => {
        if (data.resultado != null && data.resultado === false) {
          console.log(data.log);
          reject(data.log);
        }
        return resolve(data.progreso);
      });
    })
  }
}
