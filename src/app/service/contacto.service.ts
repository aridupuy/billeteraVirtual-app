import { EstadoProcesoService } from './estado-proceso.service';
import { catchError } from 'rxjs/operators';
import { HttpEventType, HttpEvent, HttpParams } from '@angular/common/http';
import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
let httpOptions = {

  headers: { contentType: 'application/json', token: '', responseType: 'json',  reportProgress: true,
  observe: 'events' },
  params :new HttpParams()
};
interface resp {
  log: any,
  extras: any[],
  resultado: any,
}
@Injectable({
  providedIn: 'root'
})
export class ContactoService extends ServiceService {


  obtener_pedidos_dinero() {
    console.log(localStorage.getItem('token'));
    httpOptions.headers.token = localStorage.getItem('token');
    //var postParams = { nombre: nombre, apellido: apellido,cuit:cuit,referencia:referencia, email:email,cvu:cvu,cbu:cbu,alias:alias };
    return new Promise((resolve, reject) => {
      this.get<any>('api/contacto/obtener_pedidos_dinero', httpOptions).subscribe((data: resp) => {
        console.log(data);
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        if (data.extras.length > 0) {
          // console.log("con datos");
          return resolve(data.extras[0]);
        }
        else {
          // console.log("sin datos");
          return resolve([]);
        }
      });
    });
  }
  obtener_pedidos_dinero_otros() {
    httpOptions.headers.token = localStorage.getItem('token');
    //var postParams = { nombre: nombre, apellido: apellido,cuit:cuit,referencia:referencia, email:email,cvu:cvu,cbu:cbu,alias:alias };
    return new Promise((resolve, reject) => {
      this.get<any>('api/contacto/obtener_pedidos_dinero_otros', httpOptions).subscribe((data: resp) => {
        console.log(data);
        if (data.resultado != null && data.resultado === false) {
         
          reject(data.log);
        }
        if (data.extras.length > 0) {
          // console.log("con datos");
          return resolve(data.extras[0]);
        }
        else {
          // console.log("sin datos");
          return resolve([]);
        }

      });
    });
  }

  obtener_historial_envios(offset?,limit?) {
    httpOptions.headers.token = localStorage.getItem('token');
    let params = new HttpParams().append("limit",limit).append("offset",offset);
    httpOptions.params = params;
    return new Promise((resolve, reject) => {
      this.get<any>('api/contacto/obtener_historial_envios', httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          console.log(data.log);
          reject(data.log);
        }
        if (data.extras.length > 0) {
          console.log("con datos");
          return resolve(data.extras[0]);
        }
        else {
          console.log("sin datos");
          return resolve([]);
        }
      });
    });
  }


  obtener_ultimos_contactos() {
    httpOptions.headers.token = localStorage.getItem('token');
    //var postParams = { nombre: nombre, apellido: apellido,cuit:cuit,referencia:referencia, email:email,cvu:cvu,cbu:cbu,alias:alias };
    return new Promise((resolve, reject) => {
      this.get<any>('api/contacto/ultimos_contactos', httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }

  crear_pedido(id, monto, mensaje) {
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { id_cuenta: id, monto: monto, mensaje: mensaje };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/crear_pedido', postParams, httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data);
      });
    });
  }
  crear_envio(id, monto, mensaje) {
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { id_cuenta: id, monto: monto, mensaje: mensaje };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/crear_envio', postParams, httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data);
      });
    });
  }


  aceptar_pedido_saldo(id) {
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { id: id };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/aceptar_pedido_saldo', postParams, httpOptions).subscribe((data: resp) => {



        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }

        return resolve(true);
      });
    });
  }
  public progress;
  aceptar_pedido_tc(id, tarjeta,id_proceso) {

    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { id: id, tarjeta: tarjeta,id_proceso:id_proceso };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/aceptar_pedido_tarjeta', postParams, httpOptions).subscribe((data: resp) => {
        console.log(data);
        if (data.resultado != null && data.resultado === false) {
          console.log(data.log);
          reject(data.log);
        }
        return resolve(data.resultado);
      });
    })
  }
  rechazar_pedido(id) {

    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { id: id };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/rechazar_pedido', postParams, httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }

        return resolve(true);
      });
    });
  }

  
  buscar_contactos(texto,tipo) {

    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { texto: texto,tipo:tipo };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/buscar_contactos', postParams, httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
  }
  activo(id) {
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { id: id };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/status_pedido', postParams, httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data.log);
      });
    });
  }
  pagarQR(monto,concepto,token){
    httpOptions.headers.token = localStorage.getItem('token');
    var postParams = { tokenContacto: token,monto:monto,concepto:concepto };
    return new Promise((resolve, reject) => {
      this.post<any>('api/contacto/pagar_qr', postParams, httpOptions).subscribe((data: resp) => {
        if (data.resultado != null && data.resultado === false) {
          reject(data.log);
        }
        return resolve(data.extras[0]);
      });
    });
    //{"ct":"S9327+xUL2MqKwooXBzuCO6SPFrZnLyAriCKBcPG/ooAnmsWjTXstbMf5Hm2Uw5j4aEkeXv58LdAkyD3gwfOsVS/r7zaeMj84w3xo8O9RVAlFp/Hc9hYi7Ok3kVw0x1C","iv":"9703859f523906a9d8ac39fbf90a5c9d","s":"30b3c29f5a2fdb71"}
  }
}
