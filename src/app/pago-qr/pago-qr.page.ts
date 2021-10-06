import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { RespuestaResultadoComponent } from './../components/respuesta-resultado/respuesta-resultado.component';
import { Deuda } from './../models/deuda';
import { Persona } from './../models/persona';
import { IQr } from './../interfaces/IQr';
import { Observable } from './../classes/observable';
import { CryptoJSAesJson, ServiceService, CLAVE_ENCRIPTACION } from './../service/service.service';
import { Component, OnInit } from '@angular/core';
//import { ScannerPagosPage } from './../scanner-pagos/scanner-pagos.page';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-pago-qr',
  templateUrl: './pago-qr.page.html',
  styleUrls: ['./pago-qr.page.scss'],
})
export class PagoQrPage implements OnInit {
  public data_qr: any;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'Techiediaries';
  pagar = true;
  cobrar = false;
  mostrar_monto: boolean = true;
  mostrar_qr: boolean = false;
  mostrar_camara: boolean = false;
  public monto:number;
  public traslada:boolean;
  public concepto:Text;
  form: FormGroup;
  public log="";
  public estado;
  ngOnInit() {
    document.addEventListener('backbutton', function (event) {
      this.pagar = true;
    });
    
  }
  constructor(private BarcodeScanner: BarcodeScanner, private storage: Storage, 
    public LoadingController: LoadingController,public fb: FormBuilder,public router: Router,public service:ServiceService,public navCtrl:NavController) {
      this.form = fb.group({
          monto: [""],
          concepto: [""],
          traslada: [""]
      });
   //ScannerPagosPage.setContext(this);
    
  }
  continuar() {
    this.mostrar_monto = false;
    this.mostrar_qr = true;
    this.mostrar_camara = false;
    let data = { monto: this.form.value.monto, concepto: this.form.value.concepto,traslada:this.traslada,token:localStorage.getItem("token")};
    this.data_qr = this.service.encrypt(data,CLAVE_ENCRIPTACION);
    console.log(this.data_qr);
  }
  cambiar() {
    this.mostrar_monto = true;
    this.mostrar_qr = false;
    this.mostrar_camara = false;
  }
  ionViewWillEnter() {
    this.mostrar_monto = true;
    this.mostrar_qr = false;
    this.mostrar_camara = false;
  }
  cambiaOpcion(event) {
    switch (event.detail.value) {
      case "Pagar":
        this.pagar = true;
        console.log(this.monto);
        console.log(this.concepto);
        break;
      case "Cobrar":
        console.log(this.monto);
        console.log(this.traslada);
        console.log(this.concepto);
        this.pagar = false;
        this.mostrar_camara=true;
        this.mostrar_qr=false;
        this.abrir_camara();
        break;
    }
  }
  abrir_camara(){
    //ScannerPagosPage.context = this;
    this.router.navigateByUrl("scanner-pagos");
    Observable.suscribe("QROK",(data:IQr)=>{
      const persona:Persona=data.persona;
      const deuda:Deuda=data.deuda;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({persona:persona,deuda:deuda,sinCuenta:false,url:"pago-qr"})
        }
      };
      this.pagar = false;
      this.mostrar_camara=true;
      this.mostrar_qr=false;
      console.log("QROK");
      console.log(data);
      this.navCtrl.navigateRoot("pagar",navigationExtras);
    })
    Observable.suscribe("QRError",(data)=>{
      this.pagar = false;
      this.mostrar_camara=true;
      this.mostrar_qr=false;
      let event={detail:{value:"cobrar"}};
      this.cambiaOpcion(event);
      RespuestaResultadoComponent.setStatus(3);
      this.log=data;
      console.log(this.log);
      console.log(data);
    });
    Observable.suscribe("pagar",(data)=>{
      console.log(data);
      RespuestaResultadoComponent.setStatus(2);
    })

  }  
  ionViewDidEnter() {
    RespuestaResultadoComponent.setStatus(0);
  }

}
