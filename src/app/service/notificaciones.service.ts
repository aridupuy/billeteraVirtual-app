import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
interface Inotificacion{
  resultado:any,
  log:any,
  extras:[{
    id_notificacion:number,
    fecha:any,
    mensaje:string,
    visto:boolean,
  }]
}
interface Icantidad{
  resultado:any,
  log:any,
  extras:[]
}

var httpOptions = {

  headers: { 'Content-Type': 'application/json' ,"token":""}

};
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService extends ServiceService{

  obtener_notificaciones(){
    return new Promise((resolve,rejects)=>{
      httpOptions.headers.token=localStorage.getItem("token");
      this.get<Inotificacion>("api/notificar/notificaciones", httpOptions)
        .subscribe((data) => {
          if (data.resultado != undefined  && (data.resultado !==0 || data.resultado !==false)){
            resolve(data.extras[0]);
          }
          else{
            rejects(false);
          }
        }) ;
    });
  }
  obtener_cantidad_no_leidas(){
    return new Promise((resolve,rejects)=>{
      httpOptions.headers.token=localStorage.getItem("token");
      this.get<Icantidad>("api/notificar/notificaciones_no_vistas", httpOptions)
        .subscribe((data) => {
          if (data.resultado != undefined  && (data.resultado !==false)){
            resolve(data.extras[0]);
          }
          else{
            rejects(false);
          }
        }) ;
    });
  }
  marcar_visto(id_notificacion){
    return new Promise((resolve,rejects)=>{
      httpOptions.headers.token=localStorage.getItem("token");
      this.post<Icantidad>("api/notificar/marcar_visto", {id:id_notificacion},httpOptions)
        .subscribe((data) => {
          if (data.resultado != undefined  && (data.resultado !=false)){
            resolve(true);
          }
          else{
            rejects(false);
          }
        }) ;
    });
  }
}
