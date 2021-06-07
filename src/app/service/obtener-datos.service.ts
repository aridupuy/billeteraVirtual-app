import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
interface datos{
  resultado:any,
  log:any,
  extras:[{
    cvu:any,
    alias:any,
  }]
}
var httpOptions = {

  headers: { 'Content-Type': 'application/json' ,"token":""}

};
@Injectable({
  providedIn: 'root'
})
export class ObtenerDatosService extends ServiceService{

    obtener_datos(){
      return new Promise((resolve,rejects)=>{
        httpOptions.headers.token=localStorage.getItem("token");
        this.get<datos>("api/transferencia/obtener_datos", httpOptions)
          .subscribe((data) => {
            if (data.resultado != undefined  && (data.resultado !==false)){
              resolve({cvu:data.extras[0].cvu,alias:data.extras[0].alias});
            }
            else{
              rejects(false);
            }
          }) ;
      });
    }
}
