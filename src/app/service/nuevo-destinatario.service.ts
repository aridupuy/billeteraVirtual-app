import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
let httpOptions = {

  headers: { contentType: 'application/json',token:'' , responseType: 'json' }

};
@Injectable({
  providedIn: 'root'
})
export class NuevoDestinatarioService extends ServiceService {

  crear_destinatario(nombre, apellido, cuit, referencia, email, cvu, cbu, alias){
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { nombre: nombre, apellido: apellido,cuit:cuit,referencia:referencia, email:email,cvu:cvu,cbu:cbu,alias:alias };
    return new Promise((resolve, reject) => {
      this.post<any>('api/destinatario/crear_destinatario',postParams, httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data);
      });
    });
  }
}
