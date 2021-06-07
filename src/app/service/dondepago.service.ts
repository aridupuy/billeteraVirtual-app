import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
const httpOption = {

  headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") }


};
@Injectable({
  providedIn: 'root'
})
export class DondepagoService extends ServiceService{

  obtener_localidades(latitud,longitud,mp){
    httpOption.headers.token=localStorage.getItem("token");
    var postParams = { latitud: latitud,longitud:longitud,mp:mp};
    return new Promise((resolve, reject) => {
      this.post<any>('api/dondepago/obtener_localidad',postParams,httpOption).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        console.log(data);
        return resolve(data.extras[0]);
      });
    });
  }
  obtener_mp(){
    httpOption.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
    this.get<any>('api/dondepago/obtener_mp',httpOption).subscribe((data) => {
    if (data.resultado != null && data.resultado == false) {
        reject(data.log);
      }
      return resolve(data.extras[0]);
      });
    });
  }
}
