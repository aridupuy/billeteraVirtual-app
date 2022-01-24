import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { IUsuario } from '../interfaces/iUsuario';
import { Usuario } from '../models/usuario';
import { IUsuarioPermiso } from '../interfaces/iusuario-permiso';



var httpOptions = {

  headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") }

};
@Injectable({
  providedIn: 'root'
})
export class UssersService extends ServiceService {

  obtener_usuarios() {
    httpOptions.headers.token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<IUsuario>('api/usuarios/obtener', httpOptions).subscribe((data) => {
        // console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
  cambiar_usuario(usuario:Usuario){
    httpOptions.headers.token = localStorage.getItem("token");
    let postParams={id:usuario.id};
    return new Promise((resolve, reject) => {
      this.post<IUsuario>('api/usuarios/cambiar_estado',postParams , httpOptions).subscribe((data) => {
        // console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }

  crear_usuario(usuario:Usuario){
    httpOptions.headers.token = localStorage.getItem("token");
    let postParams=usuario;
    return new Promise((resolve, reject) => {
      this.post<IUsuario>('api/usuarios/crear_usuario',postParams , httpOptions).subscribe((data) => {
        // console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
  obtener_permisos(){
    httpOptions.headers.token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.get<IUsuarioPermiso>('api/usuarios/obtener_permisos',httpOptions).subscribe((data) => {
        // console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }

  obtener_permisos_usuario(usuario:Usuario){
    httpOptions.headers.token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.post<IUsuarioPermiso>('api/usuarios/obtener_permisos',usuario,httpOptions).subscribe((data) => {
        // console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
  setear_permiso(permisos,usuario,options){
    httpOptions.headers.token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.post<IUsuarioPermiso>('api/usuarios/setear_permisos',{usuario:usuario,permisos:permisos,options},httpOptions).subscribe((data) => {
        // console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
  reenviar_url(usuario){
    httpOptions.headers.token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      this.post<IUsuarioPermiso>('api/usuarios/reenviar_url',{usuario:usuario},httpOptions).subscribe((data) => {
        // console.log(data);
        if (data.resultado != null && data.resultado == false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }

}
