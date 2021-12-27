import { LoginBoService,proceso } from './login-bo.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'
//import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies/ng2-cookies';

interface respuestaRenaperBusqueda {
  resultado: any,
  log: any;
  extras: [{
    id_tramite_principal: any,
    id_tramite_tarjeta_reimpresa: any,
    ejemplar: any,
    vencimiento: any,
    emision: any,
    apellido: any,
    nombres: any,
    fecha_nacimiento: any,
    cuil: any,
    calle: any,
    numero: any,
    piso: any,
    departamento: any,
    codigo_postal: any,
    barrio: any,
    monoblock: any,
    ciudad: any,
    municipio: any,
    provincia: any,
    pais: any,
    nacionalidad: any,
    codigo_fallecido: any,
    mensaje_fallecido: any,
    id_ciudadano: any,
    codigo: any,
    mensaje: any,
  }]
}
var httpOptions = {

  headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") }

};
@Injectable()
export class RenaperService extends LoginBoService {

  //URL = "http://localhost:358/";
  //URL = "http://172.20.10.80:358/";



  public async validar_dni(dni1: any, sexo1: any) {
    var resp  ;
    await this.login().then((data:any)=>{
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = { dni: dni1, sexo: sexo1 };
        try {
          this.post<any>( 'api/validaidentidad/buscar', postParams, httpOptions)
            .subscribe(data => {
              if (data.resultado != null && data.resultado== false) {
                console.log(data.log);
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

  public async validar_rostro(foto,dni,sexo){
    var resp  ;
    console.log("Validando RostroService");
    await this.login().then((data:any)=>{
      resp = new Promise((resolve, reject) => {
        httpOptions.headers.token=data;
        var postParams = { dni: dni ,sexo:sexo,id_proceso_alta:localStorage.getItem("proceso_alta"),selfie: foto};
        try {
          
          this.post<any>( 'api/validaidentidad/validar', postParams, httpOptions)
            .subscribe(data => {
              if (data.resultado != null && data.resultado == false) {
                console.log("Validando RostroService Correcto");
                reject(data.log);
              }
              console.log("Validando RostroService Incorrecto");
              return resolve(data.extras[0]);
            });
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    })
    return resp

  }
  

  private handleError<T>(operation = 'operation', result?: T) {
    console.log("error");
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log("mensaje: " + message);
  }
}
