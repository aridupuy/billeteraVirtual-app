import { Observable } from '../../../classes/observable';
import { IdataQr } from '../../../interfaces/IdataQr';
import { ContactoService } from '../../../service/contacto.service';
import { ServiceService, CLAVE_ENCRIPTACION } from '../../../service/service.service';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Component, OnInit } from '@angular/core';
interface jsonQr {
  idComercio: string,
  token: string
}

@Component({
  selector: 'app-scanner-pagos',
  templateUrl: './scanner-pagos.page.html',
  styleUrls: ['./scanner-pagos.page.scss'],
})
export class ScannerPagosPage implements OnInit {
  //barcodeScanner = (<any>window).cordova.plugins.barcodeScanner;

  public TEST_ACTIVATED = false;
  public tok;
  public static context;
  constructor(public barcodescanner:BarcodeScanner,public service:ServiceService,public ContactoService:ContactoService,public navCtrl:NavController) { }
  static setContext(context) {
    //ScannerPagosPage.context = context;
  }
  async ngOnInit() {
    
  }
  async ionViewWillEnter() {

    var options: BarcodeScannerOptions = {
      prompt: "Escanee el codigo qr Para cobrar",
      showTorchButton: true,
      torchOn: false,
      disableSuccessBeep: true,
      showFlipCameraButton: true,
      resultDisplayDuration: 0
    };
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    window.document.body.style.backgroundColor = 'transparent';
    await this.barcodescanner.scan(options).then(async (text) => {
      let json = JSON.parse(text.text);
      console.log(text.text);
      let data_qr:IdataQr = this.service.decrypt(text.text,CLAVE_ENCRIPTACION);
      this.ContactoService.pagarQR(data_qr.monto,data_qr.concepto,data_qr.token).then(data=>{
        console.log(data);
        Observable.notify("QROK",data);
        //this.navCtrl.back();
      }).catch(err=>{
          Observable.notify("QRError",err);
      })
      this.navCtrl.back();
    });
      /*var token="";
      await this.storage.get("token").then(async tok => {
        token=tok;
      });
      let idComercio = json.idComercio;
      let token_prov = json.token;
      let monto = json.monto;
      let traslada = json.traslada;
      let concepto = json.concepto;
      let loading = await ScannerPagosPage.context.LoadingController.create({
        message: 'Cargando',
        id: 'pagar',
        showBackdrop: true,
      });
      await loading.present();
      ScannerPagosPage.context.pagar = false;
      console.log("ANTES DE CONSULTAR");
      await this.ServiceCliente.PagoAProveedor(token,token_prov,idComercio,monto,concepto,traslada).then(async data=>{
        console.log("sali por aca2");
        if(data==false)
          alert('El pago no pudo ser efectuado'); 
        else
          alert( 'Pago Realizado'); 
        loading.dismiss();
      })
      .catch(data=>{
        alert( 'El pago no pudo ser efectuado');
        loading.dismiss();
      });
      this.router.navigate(["/tabs/transferencia"]);
    }).catch(error => {
      ScannerPagosPage.context.pagar = true;
      alert ('El pago no pudo ser efectuado');
      console.log(JSON.stringify(error));
      this.router.navigate(["/tabs/transferencia"]);
      return;
    });*/
  }
  
}