import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
var httpOptions = {

  headers: { contentType:'application/json','token':"" ,responseType: 'json' }

};
interface destinatarios {
  resultado: any;
  log: any;
  extras: [
        { destinatarios: [{
          alias: string
          apellido: string
          cbu: string
          cuit: string
          cvu: string
          email: string
          id_cuenta: string
          id_destinatario: string
          nombre: string
          referencia: string
        }] }
  ]
}
@Injectable({
  providedIn: 'root'
})
export class ObtenerDestinatariosService extends ServiceService {

  public obtener_destinatarios() {
    httpOptions.headers.token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<destinatarios>('api/destinatario/consultar_destinatario', httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data.extras[0].destinatarios);
      });
    });
  }

  

}
