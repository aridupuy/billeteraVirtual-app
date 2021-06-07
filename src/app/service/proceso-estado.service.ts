import { LoginService } from './login.service';
import { LoginBoService } from './login-bo.service';
import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
interface proceso {
  "resultado": boolean,
  "log": "",
  "extras": [
    {
      "data": {
        "valida_cel": boolean,
        "valida_ident": boolean,
        "valida_mail": boolean
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
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          let dataReturn = { valida_mail: data.extras[0].data.valida_mail, valida_ident: data.extras[0].data.valida_ident, valida_cel: data.extras[0].data.valida_cel };
          return resolve(dataReturn);
        });
      });
  }



}
