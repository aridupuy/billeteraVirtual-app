import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-ingresa-pin-confirma',
  templateUrl: './ingresa-pin-confirma.page.html',
  styleUrls: ['./ingresa-pin-confirma.page.scss'],
})
export class IngresaPinConfirmaPage implements OnInit {
  @ViewChild('ingreso1') passcode1;
  @ViewChild('ingreso2') passcode2;
  @ViewChild('ingreso3') passcode3;
  // @ViewChild('ingreso4') passcode4:HTMLElement ;
  @ViewChild('ingreso4') passcode4;

  // @ViewChild('passcode1')  passcode11;
  // @ViewChild('passcode2') passcode22 ;
  // @ViewChild('passcode3') passcode33 ;
  // @ViewChild('passcode4') passcode44;
  @ViewChild('shakeit') shakeit;
  public values: any = [];

  // public error_code: any;
  public proposito=0 ;
  public iniciales = "";
  public titulo;
  public titulo2 = "¡Creá tu nuevo  PIN de acceso!";
  public pago = false;
  public conHuella = false;
  constructor(private faio: FingerprintAIO, public navCtl: NavController, public viewCtrl: ModalController, public route: ActivatedRoute) { }

  ngOnInit() {
    this.iniciales = localStorage.getItem("iniciales");
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
   
    switch (this.proposito) {
      case 0:
        this.titulo = "Reingresá tu Pin";
        break;
    }
  }
  onKeyUp(event, index) {
    // if (event.target.value.length != 1) {
    //   this.setFocus(index - 2);
    // } else {
    this.values.push(index);
    // event.target.type = "password";
    if (index == "borrar") {
      this.setFocus("borrar");
      this.values = [];
    }
    else if (this.values.length == 4) {
      this.setFocus(this.values.length);
      return this.validarCodigo();
    }
    else
      this.setFocus(this.values.length);
    // console.log(this.values);
    event.stopPropagation();
  }
  setFocus(index) {
    index--;
    // console.log(index);
    switch (index) {
      case 0:
        // this.
        console.log(JSON.stringify(this.passcode1));
        console.log(JSON.stringify(this.passcode1.nativeElement));
        this.passcode1.nativeElement.classList.toggle("confirm");
        // this.passcode22.setFocus();
        // this.passcode2.nativeElement.setFocus();
        break;
      case 1:
        this.passcode2.nativeElement.classList.toggle("confirm");
        // this.passcode33.setFocus();
        // this.passcode3.nativeElement.setFocus();
        break;
      case 2:
        this.passcode3.nativeElement.classList.toggle("confirm");
        // this.passcode44.setFocus();
        // this.passcode4.nativeElement.setFocus();
        break;
      case 3:
        this.passcode4.nativeElement.classList.toggle("confirm");
        // this.passcode44.setFocus();
        // this.passcode4.nativeElement.setFocus();
        break;
      default:
        this.passcode1.nativeElement.classList.remove("confirm");
        this.passcode2.nativeElement.classList.remove("confirm");
        this.passcode3.nativeElement.classList.remove("confirm");
        this.passcode4.nativeElement.classList.remove("confirm");
        // this.passcode44.setFocus();
        // this.passcode4.nativeElement.setFocus();
        break;

      // this.passcode1.nativeElement.setFocus();
      // this.passcode11.setFocus();
    }
    // console.log(this.clave1+""+this.clave2+""+this.clave3+""+this.clave4+"");
  }
  LostPassword() {
    this.navCtl.navigateForward(["lostpassword", {}]);
  }
  validarCodigo() {
    console.log("Validando Codigos");
    switch (this.proposito) {
      case 0:
        let clave = "";
        this.values.forEach(valor => {
          clave += "" + valor;
        });
        // this.navCtrl.navigateForward("ingresa-pin-confirma", navigationExtras);
        console.log("confirma " + clave);
        this.faio.show({
          title:"Para la proxima",
          description: "queres  acceder la proxima vez usando tu huella?",
          fallbackButtonTitle: 'Atras',
          cancelButtonTitle: 'cancelar',
          disableBackup: true,
          subtitle: "Usar la huella"
        }).then(data => {
          console.log("aca registerBiometricSecret success");
          console.log(JSON.stringify(data));
          localStorage.setItem("conDatoBiometrico","si");
        }).catch(err => {
          console.log("aca registerBiometricSecret error");
          console.log(err);
        });
        this.viewCtrl.dismiss(clave);
        break;
    }
  }
}
