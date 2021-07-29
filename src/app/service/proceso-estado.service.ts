import { LoginService } from './login.service';
import { LoginBoService } from './login-bo.service';
import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import Integer from '@zxing/library/esm/core/util/Integer';
interface proceso {
  "resultado": boolean,
  "log": "",
  "extras": [
    {
      "data": {
        "valida_cel": boolean,
        "valida_ident": boolean,
        "valida_mail": boolean
        "estado_validacion":number,
        "cel":string,
        "mail":string
      }
    }
  ]
}
var httpOptions = {

  headers: { 'Content-Type': 'application/json', "token": "asdad" }

};
@Injectable({
  providedIn: 'root'
})
export class ProcesoEstadoService extends ServiceService {

  validar() {
      httpOptions.headers.token = localStorage.getItem("token");
      return new Promise((resolve, reject) => {
        this.get<proceso>( 'api/procesoaltavalidation/consulta_estado', httpOptions).subscribe((data) => {
          console.log(data);
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          let dataReturn={};
          if('data' in data.extras[0]){
            dataReturn = {cel:data.extras[0].data.cel,mail:data.extras[0].data.mail,estado_cuenta:data.extras[0].data.estado_validacion, valida_mail: data.extras[0].data.valida_mail, valida_ident: data.extras[0].data.valida_ident, valida_cel: data.extras[0].data.valida_cel };
            return resolve(dataReturn);
          }
          else{
            reject(false);
          }
        });
      });
  }



}
