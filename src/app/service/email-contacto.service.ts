import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
const httpOption = {

  headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") }


};
@Injectable({
  providedIn: 'root'
})
export class EmailContactoService  extends ServiceService{

  enviar_mail_soporte(email,nombre,mensaje,token){
    httpOption.headers.token=token;
    var postParams = { email:email,nombre:nombre,mensaje:mensaje};
    return new Promise((resolve, reject) => {
      console.log(httpOption);
      this.post<any>('api/contactocliente/enviarcontactomail',postParams,httpOption).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        console.log(data);
        return resolve(data.extras[0]);
      });
    });
  }
}
