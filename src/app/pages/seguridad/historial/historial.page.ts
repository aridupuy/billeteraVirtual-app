import { NavigationExtras } from '@angular/router';
import { ItemsMoves } from '../../../interfaces/items-moves';
import { TransaccionesService } from '../../../service/transacciones.service';
import { Transacciones } from '../../../interfaces/transacciones';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { IFilter } from '../../../interfaces/IFilter';
import { FilterPage } from '../../modulos/filter/filter.page';

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
  public items: { titulo: any; precio: any; fecha: any; tipo: any; id_tipo_trans: any; id_cuenta: any; fijo: any; variable: any; monto_final: number; id_entidad: any; id_referencia: any; resumen: any; click(): void; }[];
  public itemback: any;
  public class_refresher = "";
;
  constructor(private menu: MenuController, public transaccionesService: TransaccionesService,public modalController:ModalController,public navCtrl:NavController) { }

  ngOnInit() {
    this.cargar_transacciones();
  }
  mostrar(event: any) {
    this.class_refresher = "refresher"

  }
  refresh(event: any) {
    this.offset = 0;
    // this.items = undefined;
    this.itemback = undefined;
    this.refrescar = true;
    this.cargar_transacciones_filtrado(event);
    
  }
  myDateParser(dateStr : string) : string {
    

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)
    if(millisecond==""){
      millisecond="00";
    }
    let validDate = date + 'T' + time + '.' + millisecond;
    return validDate
  }
  cargar_transacciones() {
    const desde = '';
    const hasta = '';
    const mp = '';
    this.transaccionesService.obtener_transacciones(this.offset, this.limit).then((data: Transacciones[]) => {
      let i = 0;
      for (const dato of data) {
        let fila = { titulo: dato.mp, precio: dato.monto, fecha: dato.fecha_pago, tipo: dato.concepto, id_tipo_trans: dato.id_tipo_trans, id_cuenta: dato.id_cuenta, fijo: dato.pri_fijo, variable: dato.pri_variable, monto_final: dato.monto_final, id_entidad: dato.id_entidad, id_referencia: dato.id_referencia, resumen: dato.resumen_op, click() { } };
        fila.fecha = this.myDateParser(fila.fecha);
        if (this.items == undefined) {
          this.items = [fila];
        }
        this.items[i] = fila;
        i++;
      }
      // let fila = {titulo:data[0].mp,precio:data[0].monto,fecha:data[0].fecha_pago,tipo:data[0].concepto,click: function () {}};
      // this.items[i]=fila;
      this.itemback = this.items;
      // console.log(this.items);
    });


  }
  fecha_espaniol(fecha: any) {

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
  cargar_transacciones_filtrado(event?: { target: { complete: () => void; }; }) {
    const desde = '';
    const hasta = '';
    const mp = '';
    // tslint:disable-next-line: max-line-length
    this.transaccionesService.obtener_transacciones_filtrado(HistorialPage.desde, HistorialPage.hasta, mp, this.limit, this.offset, localStorage.getItem('token')).then((data: Transacciones[]) => {
      //console.log(data);
      let i = 0;
      for (const dato of data) {
        // console.log(data);
       let fila = { titulo: dato.mp, precio: dato.monto, fecha: dato.fecha_pago, tipo: dato.concepto, id_tipo_trans: dato.id_tipo_trans, id_cuenta: dato.id_cuenta, fijo: dato.pri_fijo, variable: dato.pri_variable, monto_final: dato.monto_final, id_entidad: dato.id_entidad, id_referencia: dato.id_referencia, resumen: dato.resumen_op, click() { } };
        // tslint:disable-next-line: triple-equals
        fila.fecha = this.myDateParser(fila.fecha);

        if(this.refrescar==true){
          this.items = undefined;
          this.itemback = undefined;
          this.refrescar = false;
        }
        if (this.items == undefined) {
          
          this.items = [fila];
        }else{
          // console.log(fila);
          this.items.push(fila);
        }
        i++;
      }
      // let fila = {titulo:data[0].mp,precio:data[0].monto,fecha:data[0].fecha_pago,tipo:data[0].concepto,click: function () {}};
      // this.items[i]=fila;
      this.itemback = this.items;
      this.items = this.items.filter(this.filtrarTipo); //solo tipo por que fecha se filtra desde el endpoint


      if (event) {
        event.target.complete();
        this.class_refresher = "";
      }
    }).catch(err => { console.log(err); });
  }
  cargarmas(event: any) {
    this.offset += this.limit;
    this.cargar_transacciones_filtrado(event);

  }
  async presentModal() {
    let modal = await this.modalController.create({component:FilterPage, componentProps: { tipo: HistorialPage.select,desde:HistorialPage.desde,hasta:HistorialPage.hasta }});
    modal.onDidDismiss().then((data)=>{
      if (typeof (data.data) != 'undefined') {
          // console.log(data);    
          HistorialPage.select = data.data.select;
          HistorialPage.desde = data.data.desde;
          HistorialPage.hasta = data.data.hasta;
      }
      else {
        HistorialPage.select = '1';
        HistorialPage.desde = null;
        HistorialPage.hasta = null;
      }
      this.items = this.itemback
      this.items = this.items.filter(this.filtrarTipo);
      this.items = this.items.filter(this.filtrarFecha);
      if(this.items.length==0){
        this.cargar_transacciones_filtrado(null);
      }
      // console.log(this.items);
    });
    modal.present();

}
verMas(item){
  console.log(item);
  const navigationExtras: NavigationExtras = {
    queryParams: {
      param: JSON.stringify({item:item})
    }
  }
  this.navCtrl.navigateForward("detalle-transaccion",navigationExtras);
  //this.navCtl.navigateForward("detalle-transaccion",);
}
filtrarTipo =  (element: ItemsMoves, index: any, array: any) =>{
    switch (HistorialPage.select) {
        case '1':
            return true;
            break;
        case '2':
        if (array[index].id_tipo_trans == "2")
            
                return true;
            break;
        case '3':
            if (array[index].id_tipo_trans == "1")
                return true;
            break;
        default:
            return true;
    }
    return false;
};
filtrarFecha = (element: { fecha: any; }, index: any, array: any) => {
  
  
  if(HistorialPage.desde==null && HistorialPage.hasta==null){
      return true;
  }
    let d1 = new Date((HistorialPage.desde));
    let d2 = new Date((HistorialPage.hasta));
    let now = new Date((element.fecha));
    d1=this.quitarTiempo(d1);
    d2=this.quitarTiempo(d2);
    now= this.quitarTiempo(now);
    return (HistorialPage.desde=="" || now>=d1) && (HistorialPage.hasta=="" || now<=d2);

};

quitarTiempo(date:Date){
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

}