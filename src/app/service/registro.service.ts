import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { LoginBoService } from './login-bo.service';
import { pass } from '../patron.guard';
interface res {
  resultado: any;
  log: any;
  extras: [
    {}
  ]
}
var httpOptions = {

  headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") }

};
@Injectable({
  providedIn: 'root'
})
export class RegistroService extends LoginBoService {

  async registrar(email, titular, password, valido_sms, terminos_acepta, cod_area, celular, selfie, selfie_doc, fotoDorso, fotoFrente, documento, fecha_nac, id_pais, genero, estado_civil, ocupacion, id_prov, id_loc, cod_postal, calle, numero, piso, depto, fatca, politico_expuesto, sujeto_obligado, cuit, cuit_modificado) {
    var resp;
    console.log(localStorage.getItem("proceso_alta"));
    console.log(localStorage.getItem("id_proceso_alta"));
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          email: email,
          titular: titular,
          password: password,
          valido_sms: valido_sms,
          terminos_acepta: terminos_acepta,
          cod_area: cod_area,
          celular: celular,
          selfie: selfie,
          selfie_doc: selfie_doc,
          fotoDorso: fotoDorso,
          fotoFrente: fotoFrente,
          documento: documento,
          fecha_nac: fecha_nac,
          id_pais: id_pais,
          genero: genero,
          estado_civil: estado_civil,
          ocupacion: ocupacion,
          id_prov: id_prov,
          id_loc: id_loc,
          cod_postal: cod_postal,
          calle: calle,
          numero: numero,
          piso: piso,
          depto: depto,
          id_proceso_alta: localStorage.getItem("proceso_alta"),
          fatca: fatca,
          politico_expuesto: politico_expuesto,
          sujeto_obligado: sujeto_obligado,
          cuit: cuit,
          cuit_modificado: cuit_modificado
        });
        console.log(postParams);
        this.post<res>('api/alta/crear', postParams, httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    });
    return resp
  }
  async obtener_datos_usuario(usuario) {
    var resp;
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          email: usuario,

        });
        console.log(postParams);
        this.post<res>('api/alta/obtener_datos_usuario', postParams, httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    });
    return resp
  }
  async enviar_codigo(porMail, porTel, usuario) {
    var resp;
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          email: usuario,
          porMail: porMail,
          porTel: porTel
        });
        console.log(postParams);
        this.post<res>('api/alta/enviar_codigo', postParams, httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    });
    return resp
  }
  async validar_codigo(codigo, usuario) {
    var resp;
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          email: usuario,
          codigo: codigo,
        });
        console.log(postParams);
        this.post<res>('api/alta/validar_codigo', postParams, httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    });
    return resp
  }

  async cambiar_pass(id_usuario, password) {
    var resp;
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          id_usuario: id_usuario,
          nueva_pass: password,
        });
        console.log(postParams);
        this.post<res>('api/alta/cambiar_password', postParams, httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    });
    return resp
  }

}
