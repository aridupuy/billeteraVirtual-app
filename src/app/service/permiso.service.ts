import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {
    IUsuarioPermiso,
    IUsuarioPermisoExtra,
    IUsuarioPermisoArray
} from '../interfaces/iusuario-permiso';
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
        console.log("RUTAS OBTENIDAS POR API");
        console.log(data);
        rutas=data;
        Cookie.set("rutas",JSON.stringify(rutas),1);
        console.log("coockie seteada");

      });
    }
    let valida_ok=false;

    console.log("RUUUUTAS");
    console.log(rutas);
    console.log("RUUUUTAS");
    await Object.values(rutas[0]).forEach(async (ru:any)=> {
      if(ruta == ru.ruta){
        valida_ok=true;
      }
      else{
        if("submodulos" in ru ){
          await ru.submodulos.forEach(subru => {
            if(subru.ruta==ruta){
              valida_ok=true;
            }  
          });
          
        } 
      }
    });
    if(!valida_ok){
      console.log("LA RUTA NO SE VALIDA");
      return  new Promise((resolve, reject) =>{resolve(true)});
    }
    httpOptions.headers.token=localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      var postParams = ({ ruta:ruta });
      console.log("VALIDANDO RUTA CON PUEDE");
      this.post<any>('api/permiso/puede',postParams,httpOptions).subscribe((data) => {
        console.log(data);
        console.log("RESULTADO PUEDE");
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
      this.get<IUsuarioPermiso>('api/permiso/obtener_permisos',httpOptions).subscribe((data:IUsuarioPermisoExtra) => {
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        console.log(data);
        return resolve(data.extras);
      });
    });
  }

  obtener_rutas_alt(){
    return new Promise((resolve, reject) => {
    this.obtener_rutas().then(async (data:IUsuarioPermisoArray)=>{
      var resultArray = await Object.keys(data[0]).map(function(index){
        let permisos = data[0][index];
        console.log(index);
        console.log(data[0][index]);
        return permisos;
        // do something with person
        
    });
    return resolve(resultArray);
    })
    .catch(data=>{
      reject(data);
    })

    })
  }


}
