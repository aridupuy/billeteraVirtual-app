import { CargandoComponent } from '../../../components/cargando/cargando.component';
import { Itarjeta } from '../../../interfaces/Itarjeta';
import { Tarjeta } from '../../../models/tarjeta';
import { TarjetasService } from '../../../service/tarjetas.service';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-tarjeta',
  templateUrl: './datos-tarjeta.page.html',
  styleUrls: ['./datos-tarjeta.page.scss'],
})
export class DatosTarjetaPage implements OnInit {
  public item:Itarjeta
  public carriers=[];
  public activo;
  public cargando=false;
  public accion="Desactivar";
  constructor(public navParams:NavParams,public modalCtrl:ModalController,public tarjeta:TarjetasService,public toast:ToastController) { }

  ngOnInit() {
    this.item=this.navParams.get("item");
    console.log("aca");
    console.log(this.item);
    if(this.item.status==4){
      console.log("aca");
      this.activo=false;
      this.accion="Activar";
    }
    else{
        this.activo=true;
      this.accion="Desactivar";
    }
    this.obtener_carriers(this.item.identificacion,this.item.bin);
  }
  obtener_banco(bin) {
    return this.carriers[bin].banco.name;
  }
  obtener_class(bin) {
    let clas = this.obtener_tipo(bin);
    // console.log("CLASE" + clas);
    return "tarjeta "+clas;
    
  }
  obtener_logo(bin) {
    switch (this.obtener_carrier(bin)) {
      case "visa":
        return "../../assets/img/visa2.svg"
      case "mastercard":
        return "../../assets/img/tarjeta-mastercard.svg"
      case "maestro":
        return "../../assets/img/tarjeta-mastercard.svg"
      default:
        return null;
    }
  }
  async obtener_carriers(identificacion, bin) {
    var resp;
    let data = JSON.parse(identificacion);
    this.carriers[bin] = { brand: data.scheme, color: data.brand, banco: data.bank, tc_td: data.type };
    return resp;
  }
  obtener_carrier(bin) {
    var resp = this.carriers[bin].brand;
    if (!resp)
      return "";
    return resp;
  }
  obtener_tipo(bin) {
    var resp = this.carriers[bin].color;
    // if (!resp)
    //   return "";
    let banco: String;
    if(this.carriers[bin].banco != undefined)
      banco= this.carriers[bin].banco.name;
    else
    if(this.carriers[bin].brand != undefined)
      banco= this.carriers[bin].brand;
    // if (banco == undefined) {
    //   return resp;
    // }
    // banco = banco.toLowerCase();
    // if (resp == "Gold" || resp == "Platinum" || resp == "Signature"){

    switch (resp) {
      case "Gold":
        return "gold";
      case "Platinum":
        return "silver";
      case "Signature":
        return "black";
      default:
        return "traditional";
    }
    // return resp
    // }

    switch (banco) {
      case "santander rio":
        if (resp == "Gold" || resp == "Platinum" || resp == "Signature")
          return resp
        resp += " santander";
    }
    return resp;
  }

  obtener_marca_img(item){
    let ident = JSON.parse(item.identificacion);
    // console.log(ident);
    switch(ident.scheme){
      case "visa":
        return "assets/img/ingreso/tarjetas/visa.svg"
      case "mastercard":
        return "assets/img/ingreso/tarjetas/mastercard.svg"
    }
    // console.log(item);
  }
  obtener_banco_img(item){
    let ident = JSON.parse(item.identificacion);
    if(!ident.bank)
    return false;
    switch(ident.bank.name){
      case "SANTANDER RIO":
        // console.log("assets/img/ingreso/tarjetas/santander.svg");
        return "assets/img/ingreso/tarjetas/santander.svg"
      case "hsbc":
        return "assets/img/ingreso/tarjetas/mastercard.svg"
    }
  }
 
  obtener_nroTarjeta(nro){
    console.log(nro);
    if(parseInt(nro)){
      return nro;
    }
    return "";
  }
  CerrarModal(){
    this.modalCtrl.dismiss();
  }
  toggle(){
    var back=this.activo;
    this.cargando=true;
    if(this.activo){
      this.activo=false;
      this.accion="Activar";
      
    }
    else{
      this.activo=true;
      this.accion="Desactivar";
    }
    console.log(this.activo);
    this.tarjeta.cambiar_estado(this.item.id).then(async data=>{
       var mensaje="";
      if(data){
        if(back)
          mensaje= 'Tarjeta desactivada';
       else{
          mensaje= 'Tarjeta activada';
       }
      }
      else{
        this.activo=back;
        mensaje="Error al cambiar de estado";
      }
      const toast = await this.toast.create({
        message: mensaje,
        duration: 3000,
        position: 'top'
      });
      this.cargando = false;
      toast.present();
     // this.modalCtrl.dismiss();
    });
  }
  eliminar(){
    this.tarjeta.eliminar(this.item.id).then(async data=>{
      var mensaje="";
     if(data){
         mensaje= 'Tarjeta eliminada';
     }
     else{
       mensaje="Error al eliminar";
     }
     const toast = await this.toast.create({
       message: mensaje,
       duration: 3000,
       position: 'top'
     });
     this.cargando = false;
     toast.present();
     this.modalCtrl.dismiss();
   });
  }
}
