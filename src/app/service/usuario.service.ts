import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
var httpOptions = {

  headers: { 'token':"" ,responseType: 'json' }

};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceService{

  obtener_mis_datos(){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      if(localStorage.getItem("usuario")!=undefined){
        console.log("retorno lo guardado");
        resolve(JSON.parse(localStorage.getItem("usuario")));
      }
      else
      this.get<any>('api/usuario/obtener_mis_datos',httpOptions).subscribe((data) => {
        console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        localStorage.setItem("usuario",JSON.stringify(data.extras[0][0]));
        return resolve(data.extras[0][0]);
      });
    });
  }
}
