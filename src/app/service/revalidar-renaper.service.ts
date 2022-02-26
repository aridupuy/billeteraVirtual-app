import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
var httpOptions = {

  headers: { 'Content-Type': 'application/json', "token": "" }

};
@Injectable({
  providedIn: 'root'
})
export class RevalidarRenaperService extends ServiceService{

  
  public async revalidar_rostro(foto,fotoDniFrente,dniD,caraDni){
    var resp  ;
    console.log("Validando RostroService");
      resp = new Promise((resolve, reject) => {
        httpOptions.headers.token=localStorage.getItem("token");
        var postParams = {selfie: foto,frentedni:fotoDniFrente,dorsodni:dniD,selfiedni:caraDni};
        try {
          
          this.post<any>( 'api/revalidaridentidad/validar', postParams, httpOptions)
            .subscribe(data => {
              if (data.resultado != null && data.resultado == false) {
                console.log("Validando RostroService Correcto");
                reject(data.log);
              }
              console.log("Validando RostroService Incorrecto");
              console.log(JSON.stringify(data));
              return resolve(data.extras[0]);
            });
        } catch (e) {
          console.log(JSON.stringify(e));
          reject(e);
        }
      });
    return resp
  }
}
