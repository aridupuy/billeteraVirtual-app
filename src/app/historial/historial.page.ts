import { TransaccionesService } from '../service/transacciones.service';
import { Transacciones } from '../interfaces/transacciones';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  static select = '1';
  static desde = null;
  static hasta = null;
  static itemsstatics: any;
  public offset = 0;
  public limit = 7;
  public items;
  public itemback;
  public class_refresher = "";
  constructor(private menu: MenuController, public transaccionesService: TransaccionesService,) { }

  ngOnInit() {
    this.cargar_transacciones();
  }
  mostrar(event) {
    this.class_refresher = "refresher"

  }
  refresh(event) {
    this.offset = 0;
    // this.items = undefined;
    this.itemback = undefined;
    this.refrescar = true;
    this.cargar_transacciones_filtrado(event);
    
  }
  cargar_transacciones() {
    const desde = '';
    const hasta = '';
    const mp = '';
    this.transaccionesService.obtener_transacciones(this.offset, this.limit).then((data: Transacciones[]) => {
      let i = 0;
      for (const dato of data) {
        const fila = { titulo: dato.mp, precio: dato.monto, fecha: dato.fecha_pago, tipo: dato.concepto, id_tipo_trans: dato.id_tipo_trans, id_cuenta: dato.id_cuenta, fijo: dato.pri_fijo, variable: dato.pri_variable, monto_final: dato.monto_final, id_entidad: dato.id_entidad, id_referencia: dato.id_referencia, resumen: dato.resumen_op, click() { } };
        if (this.items == undefined) {
          this.items = [fila];
        }
        this.items[i] = fila;
        i++;
      }
      // let fila = {titulo:data[0].mp,precio:data[0].monto,fecha:data[0].fecha_pago,tipo:data[0].concepto,click: function () {}};
      // this.items[i]=fila;
      this.itemback = this.items;
      console.log(this.items);
    });


  }
  fecha_espaniol(fecha) {

    switch (fecha) {
      case "1":
        return "Enero";
        break;
      case "2":
        return "Febrero";
        break;
      case "3":
        return "Marzo";
        break;
      case "4":
        return "Abril";
        break;
      case "5":
        return "Mayo";
        break;
      case "6":
        return "Junio";
        break;
      case "7":
        return "Julio";
        break;
      case "8":
        return "Agosto";
        break;
      case "9":
        return "Septiembre";
        break;
      case "10":
        return "Octubre";
        break;
      case "11":
        return "Noviembre";
        break;
      case "12":
        return "Diciembre";
        break;
    }
  }
  public refrescar = false;
  cargar_transacciones_filtrado(event?) {
    const desde = '';
    const hasta = '';
    const mp = '';
    // tslint:disable-next-line: max-line-length
    this.transaccionesService.obtener_transacciones_filtrado(HistorialPage.desde, HistorialPage.hasta, mp, this.limit, this.offset, localStorage.getItem('token')).then((data: Transacciones[]) => {
      //console.log(data);
      let i = 0;
      for (const dato of data) {
        console.log(data);
        const fila = { titulo: dato.mp, precio: dato.monto, fecha: dato.fecha_pago, tipo: dato.concepto, id_tipo_trans: dato.id_tipo_trans, id_cuenta: dato.id_cuenta, fijo: dato.pri_fijo, variable: dato.pri_variable, monto_final: dato.monto_final, id_entidad: dato.id_entidad, id_referencia: dato.id_referencia, resumen: dato.resumen_op, click() { } };
        // tslint:disable-next-line: triple-equals
        if(this.refrescar==true){
          this.items = undefined;
          this.itemback = undefined;
          this.refrescar = false;
        }
        if (this.items == undefined) {
          this.items = [fila];
        }else{
          console.log(fila);
          this.items.push(fila);
        }
        i++;
      }
      // let fila = {titulo:data[0].mp,precio:data[0].monto,fecha:data[0].fecha_pago,tipo:data[0].concepto,click: function () {}};
      // this.items[i]=fila;
      this.itemback = this.items;
      if (event) {
        event.target.complete();
        this.class_refresher = "";
      }
    }).catch(err => { console.log(err); });
  }
  cargarmas(event) {
    this.offset += this.limit;
    this.cargar_transacciones_filtrado(event);

  }
}
