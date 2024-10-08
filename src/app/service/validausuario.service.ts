import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';


interface respuesta{
  extras: [{
    data: {
      match: any,
      documento:any
    }
  }],
  log: any,
  resultado: any
}
var httpOptions = {

  headers: { 'Content-Type': 'application/json','token':"" }

};
@Injectable()
export class ValidausuarioService extends ServiceService{

  validar(documento,token){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      var postParams = ({ documento: documento, id_proceso_alta: localStorage.getItem("proceso_alta") });
      this.post<respuesta>( 'api/validausuario/existe',postParams,httpOptions).subscribe((data) => {
        if(!data.extras[0].data.match){
          resolve(data.extras);
        }
        else{
          reject(data.log);
        }
      });
    });
  }
  validar_usuario(usuario:string,pfpj,token){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      var postParams = ({ usuario: usuario, pfpj:pfpj,id_proceso_alta: localStorage.getItem("proceso_alta") });
      this.post<respuesta>( 'api/validausuario/existe_usuario',postParams,httpOptions).subscribe((data) => {
        console.log(data);
        console.log(data.extras[0].data.match);
        if(data.extras[0].data.match==true)
            return resolve(true);
        return reject(false);
      });
    });
  }
}
