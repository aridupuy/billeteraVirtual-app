import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';


interface Itarjetas {
  resultado: any;
  log: any;
  extras : [
        { }
  ]
}
var httpOptions = {

  headers: { 'token':"" ,responseType: 'json' }

};
@Injectable({
  providedIn: 'root'
})
export class TarjetasService extends ServiceService{

  public obtener(soloDebito?:boolean) {
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      if(soloDebito!=undefined && soloDebito==true){
        this.get<Itarjetas>('api/tarjeta/obtener_debito',httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      }
      else{
        this.get<Itarjetas>('api/tarjeta/obtener',httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      }
    });
  }
  public obtener_todas() {
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<Itarjetas>('api/tarjeta/obtener_todas',httpOptions).subscribe((data) => {
        //console.log(data);
        if (data.resultado != null && data.resultado == false) {
          console.log("rejected");
          reject(data.log);
        }
        console.log("resolved");
        return resolve(data.extras[0]);
      });
    });
  }
  public cargar(numero,cvv,mes,anio,titular,documento,token,Decidir) {
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({numero:numero,cvv:cvv,mes:mes,anio:anio,titular:titular,documento:documento,token:token,response:Decidir});
      this.post<Itarjetas>('api/tarjeta/crear',postParams,httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
  //$titular, $documento, $marchand, $tarjeta, $fecha_vto_tc, $cvv, $refe, $id_operacion, $barcode, $monto, $concepto
  public pagar_td(id_tarjeta,monto,concepto,id_transaccion) {
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({id_tarjeta:id_tarjeta,monto:monto,concepto:concepto,id:id_transaccion});
      this.post<Itarjetas>('api/tarjeta/pagar_debito',postParams,httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        
        return resolve(data.extras[0]);
      });
    });
  }


  public cambiar_estado(id){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({id_tarjeta:id});
      this.post<Itarjetas>('api/tarjeta/cambiar_estado',postParams,httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.resultado);
      });
    });
  }
  public eliminar(id){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({id_tarjeta:id});
      this.post<Itarjetas>('api/tarjeta/eliminar',postParams,httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.resultado);
      });
    });
  }
}
