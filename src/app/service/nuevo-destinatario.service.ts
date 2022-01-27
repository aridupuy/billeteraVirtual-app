import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
let httpOptions = {

  headers: { contentType: 'application/json',token:'' , responseType: 'json' }

};
@Injectable({
  providedIn: 'root'
})
export class NuevoDestinatarioService extends ServiceService {

  crear_destinatario(nombre, apellido, cuit, referencia, email, cvu, cbu, alias,banco,cod_banco,tipo){
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { nombre: nombre, apellido: apellido,cuit:cuit,referencia:referencia, email:email,cvu:cvu,cbu:cbu,alias:alias,banco:banco,cod_banco:cod_banco,tipo:tipo};
    return new Promise((resolve, reject) => {
      this.post<any>('api/destinatario/crear_destinatario',postParams, httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado === false) {
          reject({data:data.extras[0],log:data.log});
        }
        return resolve(data);
      });
    });
  }

  buscar_informacion(dato,tipo){
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams ;
    switch(tipo){
      case "cvu":
        postParams= { cvu: dato };
        break;
      case "cbu":
        postParams = { cbu: dato };
        break;
      case "alias":
        postParams = { alias: dato };
        break;
    }
    
    return new Promise((resolve, reject) => {
      this.post<any>('api/destinatario/validar_cbu_alias',postParams, httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
}
