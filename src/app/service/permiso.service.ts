import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IUsuarioPermiso, IUsuarioPermisoExtra } from '../interfaces/iusuario-permiso';
var httpOptions = {

  headers: { 'Content-Type': 'application/json', "token": "" }

};
@Injectable({
  providedIn: 'root'
})
export class PermisoService extends ServiceService {

  async puede(ruta){
    if(ruta=="accesodenegado"){
      return  new Promise((resolve,rejects)=>{resolve(true)});
    }
    let rutas = JSON.parse(Cookie.get("rutas"));
    if(!rutas){
      await this.obtener_rutas().then(data=>{
        ruta=data;
        Cookie.set("rutas",JSON.stringify(ruta),0.1);
      });
    }
    let valida_ok=false;
    await Object.values(rutas[0]).forEach((ru:any)=> {
      if(ruta == ru.ruta){
        valida_ok=true;
      }
      else{
        if("submodulos" in ru ){
          ru.submodulos.forEach(subru => {
            if(subru.ruta==ruta){
              valida_ok=true;
            }  
          });
          
        } 
      }
    });
    if(!valida_ok){
      return  new Promise(resolve=>{resolve(true)});
    }
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({ ruta:ruta });
      this.post<any>('api/permiso/puede',postParams,httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data);
        }
        return resolve(data);
      });
    });
    
  }

  async obtener_rutas(){
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<IUsuarioPermiso>('api/permiso/obtener_permisos',httpOptions).subscribe((data) => {
        console.log(data);
        if (data.resulado != null && data.resulado == false) {
          reject(data.log);
        }
        return resolve(data.extras);
      });
    });
  }

  obtener_rutas_alt(){
    return new Promise((resolve, reject) => {
    this.obtener_rutas().then((data:[IUsuarioPermisoExtra])=>{
      return resolve(data.pop);
    })
    .catch(data=>{
      reject(data);
    })

    })
  }


}
