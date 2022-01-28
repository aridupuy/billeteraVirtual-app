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

  async registrar(email, titular, password, valido_sms, terminos_acepta, cod_area, celular, selfie, selfie_doc, fotoDorso, fotoFrente, documento, fecha_nac, id_pais, genero, estado_civil, ocupacion, id_prov, id_loc, cod_postal, calle, numero, piso, depto, fatca, politico_expuesto, sujeto_obligado, cuit, cuit_modificado,pfpj,proceso_alta,usuario,relacion,sexo) {
    var resp;
    // return false;
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
          sexo:sexo,
          depto: depto,
          id_proceso_alta:proceso_alta,
          fatca: fatca,
          politico_expuesto: politico_expuesto,
          sujeto_obligado: sujeto_obligado,
          cuit: cuit || cuit_modificado ,
          pfpj:pfpj,
          usuario:usuario,
          relacion:relacion,
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




  async registrar_empresa(email, titular, password, valido_sms, terminos_acepta, cod_area, celular, selfie, selfie_doc, fotoDorso, fotoFrente, 
    documento, fecha_nac, id_pais, genero, estado_civil, ocupacion, id_prov, id_loc, cod_postal, calle, numero, piso, depto, fatca, politico_expuesto, 
    sujeto_obligado, cuit, cuit_modificado,pfpj,proceso_alta,usuario,relacion,
    persona_dni,persona_apellido,persona_nombre,persona_cuil,persona_sexo,persona_calle,persona_altura,persona_piso,persona_depto,persona_cod_postal,persona_provincia,persona_ciudad
    ,altura_empresa,calle_empresa,ciudad_empresa,cod_postal_empresa,depto_empresa,piso_empresa,provincia_empresa) {
    var resp;
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
          id_proceso_alta:proceso_alta,
          fatca: fatca,
          politico_expuesto: politico_expuesto,
          sujeto_obligado: sujeto_obligado,
          cuit: cuit || cuit_modificado ,
          pfpj:pfpj,
          usuario:usuario,
          relacion:relacion,
          persona_dni:persona_dni,
          persona_apellido:persona_apellido,
          persona_nombre:persona_nombre,
          persona_cuil:persona_cuil,
          persona_sexo:persona_sexo,
          persona_calle:persona_calle,
          persona_altura:persona_altura,
          persona_piso:persona_piso,
          persona_depto:persona_depto,
          persona_cod_postal:persona_cod_postal,
          persona_provincia:persona_provincia,
          persona_ciudad:persona_ciudad,
          altura_empresa:altura_empresa,
          calle_empresa:calle_empresa,
          ciudad_empresa:ciudad_empresa,
          cod_postal_empresa:cod_postal_empresa,
          depto_empresa:depto_empresa,
          piso_empresa:piso_empresa,
          provincia_empresa:provincia_empresa
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
          usuario: usuario,

        });
        console.log(postParams);
        this.post<res>('api/alta/obtener_datos_usuario', postParams, httpOptions).subscribe((data) => {
          console.log(data);
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    });
    return resp
  }
  async enviar_codigo(porMail, porTel, mail,changemail?,changetel?,cel?) {
    console.log(porMail, porTel, mail,changemail,changetel,cel);
    var resp;
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          email: mail,
          porMail: porMail,
          porTel: porTel,
          change_mail:changemail,
          change_cel:changetel,
          cel:cel
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
  async cambiar_cel(id_usuario, cod_area,cel) {
    var resp;
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          id_usuario: id_usuario,
          nuevo_cel: cel,
          nuevo_cod_area:cod_area
        });
        console.log(postParams);
        this.post<res>('api/alta/cambiar_celular', postParams, httpOptions).subscribe((data) => {
          if (data.resultado != null && data.resultado == false) {
            reject(data.log);
          }
          return resolve(data.extras[0]);
        });
      });
    });
    return resp
  }
  async cambiar_mail(id_usuario, mail) {
    var resp;
    await this.login().then((data: any) => {
      resp = new Promise((resolve, reject) => {
        httpOptions["headers"]["token"] = data;
        var postParams = ({
          id_usuario: id_usuario,
          nuevo_mail: mail,
        });
        console.log(postParams);
        this.post<res>('api/alta/cambiar_mail', postParams, httpOptions).subscribe((data) => {
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
