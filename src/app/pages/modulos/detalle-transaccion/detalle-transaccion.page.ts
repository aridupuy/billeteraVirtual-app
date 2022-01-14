import { NavController } from '@ionic/angular';
import { variable } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-detalle-transaccion',
  templateUrl: './detalle-transaccion.page.html',
  styleUrls: ['./detalle-transaccion.page.scss'],
})
export class DetalleTransaccionPage implements OnInit {
  @ViewChild('container') container;
  constructor(public route: ActivatedRoute, public Router: Router,public PDFGenerator:PDFGenerator,public navCtrl: NavController) { }
  public item;
  public resumen;

  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.item = p.item;
    console.log(this.item);
    
    this.resumen = JSON.parse(this.item.resumen);
    if(this.resumen.persona.nombre==null)
        this.resumen.persona.nombre = "Amigo";
    console.log(this.resumen);
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
  obtener_comisiones(){
    let comisiones=  (parseFloat(this.item.fijo)+parseFloat(this.item.variable)).toFixed(2);
    let signo = parseFloat(this.item.monto_final)-parseFloat(this.item.precio)>=0? 1: -1;
      return parseFloat(comisiones)*signo;
  }
  verComprobante(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({item:this.item})
      }
    }
    this.navCtrl.navigateForward("comprobante",navigationExtras);
    
  }

  obtener_persona(){
    if(this.resumen.hasOwnProperty("destinatario") && this.resumen.destinatario.hasOwnProperty("nombre"))
        return this.resumen.destinatario.nombre + " "+ this.resumen.destinatario.apellido;
    if(this.resumen.hasOwnProperty("detinatario") && this.resumen.detinatario.hasOwnProperty("nombre"))
        return this.resumen.detinatario.nombre + " "+ this.resumen.detinatario.apellido;
    return this.resumen.persona.nombre ;
  }
}
