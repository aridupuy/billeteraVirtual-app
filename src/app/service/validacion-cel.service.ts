import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var httpOptions = {

  headers: { 'Content-Type': 'application/json','token':"" }

};
interface result{
  resultado:any;
  log:any;
  extras:[{
    data:{
      codigo:any,
      
    },
    intentos?:number
  }]
}
interface resultRen{
  resultado:any;
  log:any;
  extras:[{
    data:{
      cel:any
    }
  }]
}

@Injectable({
  providedIn: 'root'
})

export class ValidacionCelService extends ServiceService{

  //URL = "http://localhost:358/";

  obtener_codigo(cel,token,proceso_alta){
    httpOptions.headers.token=token;
    console.log("aca service: "+cel);
    var postParams = ({ cel: cel, id_proceso_alta: proceso_alta });
    return new Promise((resolve, reject) => {
      this.post<result>('api/validasms/validar',postParams, httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras);
      });
    });
  }
  validar_codigo(cel,codigo,token,procesoAlta,intento){
    httpOptions.headers.token=token;
    return new Promise((resolve, reject) => {
      var postParams = ({ cel: cel, codigo:codigo,id_proceso_alta: procesoAlta,intentos:intento});
      console.log(postParams);
      this.post<result>( 'api/validasms/validar_codigo',postParams,httpOptions).subscribe((data) => {
        console.log(data);
        if (data.resultado != null && data.resultado == false) {
          console.log(data);
          reject({log:data.log,intentos:data.extras[0].intentos});
        }
        return resolve(data.extras[0].data.codigo);
      });
    });
  }

  reenviar_codigo(){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<resultRen>('api/validasmsreenvio/reenviar',httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0].data.cel);
      });
    });
  }
  validar_codigo_reenviado(cel,codigo,intento){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({ cel: cel, codigo:codigo,intentos:intento });
      this.post<result>('api/validasmsreenvio/validar_codigo',postParams,httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject({log:data.log,intentos:data.extras[0].intentos});
        }
        return resolve(data.extras[0].data.codigo);
      });
    });
  }
}
