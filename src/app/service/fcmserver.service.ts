import { ServiceService } from './service.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
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

  headers: { 'Content-Type': 'application/json' ,token:""}

};

@Injectable({
  providedIn: 'root'
})
export class FCMServerService extends ServiceService{

  async registerToken(token: string, platform: Platform, uniqueDeviceID: UniqueDeviceID) {
    return new Promise(async (resolve,reject) => {
        var check = 0;
        var tipo = "navegador_" + platform.platforms()[0];
        if (platform.is("android")) {
            tipo = "android";
        }
        else if (platform.is("ios")) {
            tipo = "ios";
        }
        var device;
        if (platform.is("ios") || platform.is("android")) {
            uniqueDeviceID.get()
                .then((uuid: any) => device = (uuid))
                .catch((error: any) => console.log(error));
        }
        else {
            device = Math.random() + Date.now().toString();
        }
        var postParams = ({tokenFCM: token, tipo: tipo, identificador_dispositivo: device });
        let cuentas = JSON.parse(localStorage.getItem("cuentas"));
        // console.log(cuentas);
        return cuentas.each(async cuenta=>{
          // console.log(cuenta);
          httpOption.headers.token = cuenta.token;
          return await this.post<tokenReceive>('api/fcm/registrar', postParams, httpOption)
            .subscribe(async (data) => {
                if (data.ejecucion_correcta == "1"){
                    return await localStorage.setItem("tokenFCM", token)
                    resolve(token);
                }
                else{
                  console.log("rejected");
                  reject(false);
                }
            });
        })
    });

}
async refresherToken(token: string, tipo, uniqueDeviceID) {
    var check = 0;
    let device = uniqueDeviceID;
    // let oldtoken = localStorage.getItem("tokenFCM");
    let cuentas = JSON.parse(localStorage.getItem("cuentas"));
    return cuentas.forEach(async cuenta=>{
      httpOption.headers.token = cuenta.token;
      var postParams = ({ token: token, tipo: tipo, identificador_dispositivo: device });
      this.post<tokenReceive>('api/fcm/refresh', postParams, httpOption)
          .subscribe(async (data) => {
              if (data.ejecucion_correcta == "1"){
                  await localStorage.setItem("token", token);
                  return token;
              }
          });
      });
}
refreshToken(token, platform,deviceID?,tipo?) {
  let device   
    if(!deviceID)
    device = localStorage.getItem("device");
    else{
      device = deviceID;
    }
    this.refresherToken(token, tipo, device);
}

}
