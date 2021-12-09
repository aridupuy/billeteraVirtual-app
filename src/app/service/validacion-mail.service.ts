import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface respuesta{
  extras: [{
    data: {match: any,
      url:any
    }
  }],
  log: any,
  resultado: any
}
var httpOptions = {

  headers: { 'Content-Type': 'application/json','token':"" }

};
@Injectable()

export class ValidacionMailService extends ServiceService{

  //URL = "http://localhost:358/";

  validar(mail,token){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      var postParams = ({ mail: mail, id_proceso_alta: localStorage.getItem("proceso_alta") });
      this.post<respuesta>( 'api/validamail/validar',postParams,httpOptions).subscribe((data) => {
        return resolve(data.extras[0].data.url);
      });
    });
  }
  revalidar(mail){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({ mail: mail});
      this.post<respuesta>('api/validamailreenvio/validar',postParams,httpOptions).subscribe((data) => {
        if(data.resultado==false){
          reject("error interno al enviar email.");
        }
        return resolve(data.extras[0].data.url);
      });
    });
  }
  reenviar(){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<respuesta>('api/validamailreenvio/reenviar',httpOptions).subscribe((data) => {
        if(data.resultado==false){
          reject("error interno al enviar email.");
        }
        return resolve(data.extras[0].data.url);
      });
    });
  }
  existe(mail,token){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      var postParams = ({ email: mail});
      this.post<respuesta>('api/validamail/existe',postParams,httpOptions).subscribe((data) => {
        console.log(data);
        if(data.resultado==false && data.extras[0].data.match){
          reject("El email ya existe");
        }
        return resolve(data.extras[0].data.match);
      });
    });
  }
  reenviar_empresa(){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({});
      this.post<respuesta>('api/validamailreenvio/reenvio_empresa',postParams,httpOptions).subscribe((data) => {
        if(data.resultado==false){
          reject("error interno al enviar email.");
        }
        return resolve(data.extras[0].data.url);
      });
    });
  }
}
