import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { LoginBoService } from './login-bo.service';
import { async } from 'rxjs';
import { Platform } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
interface checkToken {
  data: any;
  check: any;
}
interface tokenReceive {
  ejecucion_correcta: any;
  log: any;
}
const httpOption = {

  headers: { 'Content-Type': 'application/json', token: "" }
}

@Injectable({
  providedIn: 'root'
})
export class LocationService extends LoginBoService {

  // async obtener_pais() {
  //   var resp;
  //   await this.login().then(async(data: any) => {
  //     httpOption["headers"]["token"] = data;
  //     resp = new Promise((resolve, reject) => {
  //       var postParams = ({});
  //       this.get<any>('api/location/obtener_pais', httpOption)
  //         .subscribe(data => {
  //           if (data.resultado != null && data.resultado == false) {
  //             return reject(data.log);
  //           }
  //           return resolve({ data: data.extras, log: data.log });
  //         });
  //     });
  //     console.log(resp);
  //     return resp;
  //   });
  // }
  public async obtener_pais() {
    var resp  ;
    await this.login().then((data:any)=>{
      resp = new Promise((resolve, reject) => {
        httpOption["headers"]["token"] = data;
        try {
          this.get<any>( 'api/location/obtener_pais', httpOption)
            .subscribe(data => {
              if (data.resultado != null && data.resultado== false) {
                // console.log(data.log);
                return reject(data.log);
              }
              return resolve(data.extras[0]);
            });
        } catch (e) {
          console.log(e+"ACA");
          reject(e);
        }
      });
    })
    return resp

  }

  async obtener_provincia(id_pais) {
    var resp  ;
    await this.login().then((data:any)=>{
      resp = new Promise((resolve, reject) => {
        httpOption["headers"]["token"] = data;
        try {
          let post ={id_pais:id_pais};
          this.post<any>('api/location/obtener_provincia',post, httpOption)
            .subscribe(data => {
              if (data.resultado != null && data.resultado== false) {
                // console.log(data.log);
                return reject(data.log);
              }
              return resolve(data.extras[0]);
            });
        } catch (e) {
          console.log(e+"ACA");
          reject(e);
        }
      });
    })
    return resp
  }
  async obtener_ciudad(id_provincia) {
    var resp  ;
    await this.login().then((data:any)=>{
      resp = new Promise((resolve, reject) => {
        httpOption["headers"]["token"] = data;
        let post={id_provincia:id_provincia}
        try {
          this.post<any>('api/location/obtener_ciudad', post,httpOption)
            .subscribe(data => {
              if (data.resultado != null && data.resultado== false) {
                // console.log(data.log);
                return reject(data.log);
              }
              return resolve(data.extras[0]);
            });
        } catch (e) {
          console.log(e+"ACA");
          reject(e);
        }
      });
    })
    return resp
  }
}
