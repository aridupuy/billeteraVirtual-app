import { Itarjeta } from './../interfaces/Itarjeta';
import { DatosTarjetaPage } from './../datos-tarjeta/datos-tarjeta.page';
import { Observable } from './../classes/observable';
import { FormTcPage } from './../form-tc/form-tc.page';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { IdentificadorTcService } from './../service/identificador-tc.service';
import { TarjetasService } from './../service/tarjetas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-tc',
  templateUrl: './mis-tc.page.html',
  styleUrls: ['./mis-tc.page.scss'],
})
export class MisTcPage implements OnInit {
  public tarjetas=[];
  public carriers=[];
  public cargando=false;
  constructor(public tar:TarjetasService,public ident:IdentificadorTcService,public modalCtrl:ModalController,public navCtrl:NavController,public AlertControler:AlertController) { }

  ngOnInit() {
    this.tarjetas=[];
    this.carriers=[];
    this.cargando=true;
    this.tar.obtener_todas().then((data:any[])=>{
      if(data!=undefined)
        data.forEach(d=>{
          if(d!=undefined){
            this.tarjetas.push(<Itarjeta>{nroTarjeta:d.numero,titular:d.nombre,id:d.id,mes:d.mes,anio:d.anio,bin:d.bin,identificacion:d.identificacion,status:d.status})
            this.obtener_carriers(d.identificacion,d.bin);
          }
          
        })
      this.cargando=false;
    }).catch(async err=>{
      // console.log(err);
      const alert = await this.AlertControler.create({
        cssClass: 'my-custom-class',
        header: 'Ocurrio un error',
        message: 'Revisa tu conexión.',
        buttons: [ {
          text: 'Reintentar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.ngOnInit();
          }
        },{
          text: 'Cancelar',
          role: 'accept',
          cssClass: 'terciary',
          handler: (blah) => {
            this.navCtrl.back();
          }
        }
      ]
      });
      alert.present();
    });;
  }
  
  obtener_banco(bin) {
    return this.carriers[bin].banco.name;
  }
  obtener_class(bin) {
    let clas = this.obtener_tipo(bin);
    // console.log("CLASE" + clas);
    return " tarjeta-peq " + clas;
    
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
    
    // console.log(bin);
    var resp;
    let data = JSON.parse(identificacion);
    // console.log(data);
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
    // console.log(nro);
    if(parseInt(nro)){
      return nro;
    }
    return "";
  }
  async agregar(){
      const modal = await this.modalCtrl.create({
        component: FormTcPage,
      });
      await modal.present();
      
      Observable.suscribe("return",async ()=>{
        // console.log("aca");
        await this.modalCtrl.dismiss();
        this.ngOnInit();
        Observable.unsuscribe("return");
      });
      return true;
    }
    
  
  async ver(item){
    let modal = await this.modalCtrl.create({
      component: DatosTarjetaPage,
      componentProps:{item:item}
    });
    modal.onDidDismiss().then(data=>{
      this.tarjetas=[];
      this.cargando=true;
      this.ngOnInit();
    });
    await modal.present();
  }
  volver(){
    this.navCtrl.back();
  }
}
