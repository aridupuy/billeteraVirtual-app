import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { PricingService } from '../service/pricing.service';
import { TarjetasService } from '../service/tarjetas.service';
import { SaldoService } from '../service/saldo.service';
import { ContactoService } from '../service/contacto.service';
import { Observable } from '../classes/observable';
import { Ipagar } from '../interfaces/Ipagar';
import { RespuestaResultadoComponent } from './../components/respuesta-resultado/respuesta-resultado.component';
import { Deuda } from '../models/deuda';
import { Persona } from '../models/persona';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { LOCALE_ID } from '@angular/core';
@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: ElementRef;
  public persona: Persona;
  public deuda: Deuda;
  public saldo_en_cuenta;
  public tarjeta_elegida;
  public saldo_elegido;
  public tarjetas = [];
  public pages;
  public indexSlide = 0;
  public decidir;
  public selectedForm;
  public cargando = 0;
  public mensaje;
  public descripcion;
  public url;
  public sinCuenta = false;
  public primeracarga = false;
  public cargando_Tarjetas = true;
  public carriers = [];
  public soloDebito = false;
  public comisiones = {};
  public monto_final = {};
  public cargandoComisiones = false;
  public slideOpts: SwiperConfigInterface = {
    initialSlide: 3,
    speed: 400,
    loop: false,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    },
    uniqueNavElements: false,
    watchOverflow: false,
    slideToClickedSlide: false,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: false,
    navigation: false,
    keyboard: true,
    centeredSlides: true,
    roundLengths: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 100,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1
      }
    },
    allowSlideNext: true,
    allowSlidePrev: true,
    freeMode: false,
    slidesPerColumn: 1,

  };
  public config = {
    direction: 'horizontal',
    slidesPerView: 'auto'
  };
  constructor(public modalCtrl: ModalController, public route: ActivatedRoute, public router: Router, public contacto: ContactoService, public navCtrl: NavController, public saldo: SaldoService, public tar: TarjetasService, public pricing: PricingService) {
    RespuestaResultadoComponent.setStatus(0);
  }

  ngOnInit() {
    console.log("onInit");
    this.cargando_Tarjetas = true;
    Observable.suscribe("change", (status) => {
      Observable.unsuscribe("change");
      console.log("event call");
      this.cargando = 0;
      // RespuestaResultadoComponent.setStatus(0);
      this.saldo.obtener().then(saldo => {
        console.log(saldo);
        this.saldo_en_cuenta = saldo;
        //  this.change(false,this.slides);
        console.log(this.slides);
        this.tap();
      });
    })
    this.tarjetas;
    console.log(this.indexSlide);
    if ((this.route.snapshot.queryParamMap.has("param"))) {
      this.persona = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).persona;
      this.deuda = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).deuda;

      if ((JSON.parse(this.route.snapshot.queryParamMap.get("param"))).sinCuenta != undefined)
        this.sinCuenta = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).sinCuenta;
      if ((JSON.parse(this.route.snapshot.queryParamMap.get("param"))).soloDebito != undefined)
        this.soloDebito = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).soloDebito;
      if ((JSON.parse(this.route.snapshot.queryParamMap.get("param"))).url != undefined)
        this.url = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).url;
    }
    console.log("termina OnInit");
  }

  async tap(event?) {
    console.log(this.tarjetas.length);
    console.log(this.indexSlide);
    if (this.indexSlide == this.tarjetas.length + 1 || (this.tarjetas.length == this.indexSlide && this.sinCuenta == true)) {
      console.log("aca");
      this.presentModal();
      Observable.suscribe("return", data => {
        Observable.unsuscribe("return");
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: this.route.snapshot.queryParamMap.get("param")
          }
        };
        return this.navCtrl.navigateForward("pagar", navigationExtras).then(data => {
          this.modalCtrl.dismiss();
        })
      })
    } else {
      console.log("aca");
      return this.change();
    }

  }
  public ionViewDidEnter() {
    this.indexSlide = 0;
    //console.log(this.slides);
    console.log("en pagar");
    this.tar.obtener(this.soloDebito).then((data: any[]) => {
      data.forEach(d => {
        this.tarjetas.push({ nroTarjeta: d.numero, titular: d.nombre, id: d.id, mes: d.mes, anio: d.anio });
        this.obtener_carriers(d.identificacion, d.bin);
      })

      this.tarjetas = data;
      console.log(this.tarjetas);
    }).catch(err => {
      console.log(err);
    });
    this.saldo.obtener().then(saldo => {
      this.saldo_en_cuenta = saldo;
      //  this.change(false,this.slides);
      this.primeracarga = true;
      this.change();
    });

  }
  getStatus() {
    return RespuestaResultadoComponent.getStatus();
  }

  public tipo_deuda = "";
  async presentModal() {
    console.log("suscribiendo");
    Observable.suscribe("return", async () => {
      console.log("aca en return");
      await this.modalCtrl.dismiss();
      this.ngOnInit();
      this.ionViewDidEnter();
      Observable.unsuscribe("return");
    });
    // const modal = await this.modalCtrl.create({
    //   component: FormTcPage,

    // });

    // await modal.present();
    return true;
  }
  async change() {
    console.log("tap");
    this.tarjeta_elegida = null;
    this.saldo_elegido = false;
    this.cargando_Tarjetas = false;
    for (let i = 0; i <= this.tarjetas.length + 1; i++) {
      let slide: HTMLMediaElement = <HTMLMediaElement>document.getElementById("" + i);

      if (slide != null && i != this.indexSlide) {
        slide.classList.remove("active");
      }
    }
    let slide: HTMLMediaElement = <HTMLMediaElement>document.getElementById(this.indexSlide + "");

    if (this.indexSlide == this.tarjetas.length) {
      this.saldo_elegido = true;
    }
    if (slide != null) {
      slide.classList.toggle("active");
      if (slide.classList.contains("active"))
        this.tarjeta_elegida = this.tarjetas[this.indexSlide];
      //else
      //this.tarjeta_elegida = null;
    }
    else {

    }
    this.tipo_deuda = "";
    /*esto va a escalar*/
    switch (this.deuda.tipo_deuda) {
      case "Contacto":
        if (this.saldo_elegido == true) {
          this.tipo_deuda = "contacto-saldo";
        }
        else {
          /*va por tc */
          this.tipo_deuda = "contacto-tc";
        }
        break;
      case "Recargatd":
        console.log("aca2");
        this.tipo_deuda = "recarga-td";
        // this.tipo_deuda = "contacto-tc";
        break;
      case "recarga-efectivo":
        this.tipo_deuda = "recarga-td";
        break;
    }
    console.log(this.tipo_deuda);
    console.log(this.comisiones);
    if (this.comisiones[this.tipo_deuda] == undefined) {
      this.cargandoComisiones = true;
      console.log("cargando comisiones");
      this.comisiones[this.tipo_deuda] = 0;
      this.monto_final[this.tipo_deuda] = 0;
      await this.pricing.obtener_comisiones(this.deuda.monto, this.tipo_deuda).then((data: any) => {
        console.log(data);
        this.comisiones[this.tipo_deuda] = data.comision;
        this.monto_final[this.tipo_deuda] = data.monto_final;
        this.cargandoComisiones = false;
        console.log("cargando comisiones false");
      })
    }
  }
  CerrarModal() {
    // this.location.back();

  }
  ionViewWillEnter() {
    return this.ngOnInit();
  }
  ngAfterViewChecked() {
    if (this.primeracarga) {
      let slide: HTMLMediaElement = <HTMLMediaElement>document.getElementById(0 + "");
      if (!(!slide || slide == undefined) && !slide.classList.contains("active")) {
        slide.classList.add("active");
        this.primeracarga = false;
        if (this.tarjetas.length > 0)
          this.tarjeta_elegida = this.tarjetas[0];
      }
    }
  }
  pagar() {
    var object;
    console.log(this.tarjeta_elegida);
    if (this.tarjeta_elegida != null) {
      object = {
        tarjeta_elegida: this.tarjeta_elegida,
        persona: this.persona,
        deuda: this.deuda
      }
    }
    else {
      object = {
        saldo: this.saldo_elegido,
        persona: this.persona,
        deuda: this.deuda
      }
    }
    this.cargando = 1;
    Observable.suscribe("init-process", async (data: Ipagar) => {
      this.cargando = 1;
    });
    Observable.suscribe("pagar-result", async (data?: Ipagar | any) => {
      this.cargando = 2;
      console.log("llego a pagar-result");
      this.mostrar_mensaje(data);
    });
    Observable.notify("pagar",
      object
    );
  }
  mostrar_mensaje(data: Ipagar) {
    this.cargando = 2;
     console.log(data);
    if (data.error !== false || data.error == undefined) {
      console.log(data.error);
      this.descripcion = "Ocurrio un error"
      this.mensaje = data.error;
      this.cargando = 0;
      RespuestaResultadoComponent.setStatus(3);
    }
    else {
      RespuestaResultadoComponent.setStatus(2);
      this.mensaje = "Pagaste Con exito";
      this.descripcion = "Pagaste " + data.deuda.mensaje + "Por $" + data.deuda.monto + " a: " + data.persona.nombre + "",
        this.url = "home";
      this.cargando = 0;
      //this.ngOnInit();
      /*aca va el llamado a la pagina de ok o de error*/
      //this.navCtrl.back();
    }
    Observable.unsuscribe("pagar-result");
    /*if(data.saldo!=null){
        console.log("saldo :"+data.saldo);
        await this.contacto.aceptar_pedido(item.id).then(data=>{
          alert("Aceptaste el pedido");
          this.ngOnInit();
        }).catch(err=>{
          alert(err);
        });
        //aceptar pago con saldo
    }
    if(data.tarjeta_elegida!=null){
      pagar_td
      //aceptar pago con tc
    }*/
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
    let banco: String = this.carriers[bin].banco.name;
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
    if(!ident.bank.name)
    return false;
    switch(ident.bank.name){
      case "SANTANDER RIO":
        // console.log("assets/img/ingreso/tarjetas/santander.svg");
        return "assets/img/ingreso/tarjetas/santander.svg"
      case "hsbc":
        return "assets/img/ingreso/tarjetas/mastercard.svg"
    }
  }

  obtener_banco(bin) {
    return this.carriers[bin].banco.name;
  }
  obtener_class(bin) {
    let clas = this.obtener_tipo(bin);
    // console.log("CLASE" + clas);
    return " tarjeta " + clas;
    
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

  SeleccionaTarjeta() {

  }

}

