import { IngresaPinConfirmaPageModule } from './ingresa-pin-confirma.module';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingresa-pin-confirma',
  templateUrl: './ingresa-pin-confirma.page.html',
  styleUrls: ['./ingresa-pin-confirma.page.scss'],
})
export class IngresaPinConfirmaPage implements OnInit {
  @ViewChild('passcode1') passcode1;
  @ViewChild('passcode2') passcode2;
  @ViewChild('passcode3') passcode3;
  @ViewChild('passcode4') passcode4;
  values: any = [];
  public clave1
  public clave2
  public clave3
  public clave4
  error_code;
  iniciales
  proposito = 0;
  titulo = "";
  constructor(public navCtl:NavController,public viewCtrl: ModalController, public route: ActivatedRoute) { }

  ngOnInit() {
    this.iniciales = localStorage.getItem("iniciales");
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p != null && p["proposito"] != null) {
      this.proposito = p["proposito"]
    }
    switch (this.proposito) {
      case 0:
        this.titulo = "Reingresá tu Pin";
        break;
    }
  }
  onKeyUp(event, index) {
    if (event.target.value.length != 1) {
      this.setFocus(index - 2);
    } else {
      this.values.push(event.target.value);
      this.setFocus(index);
    }
    event.stopPropagation();
  }
  setFocus(index) {
    index --;
    switch (index) {
      case 0:
        this.passcode2.nativeElement.setFocus();
        
        break;
      case 1:
        this.passcode3.nativeElement.setFocus();
        break;
      case 2:
        this.passcode4.nativeElement.setFocus();
        break;
        case 3:
        this.validarCodigo();
        break;
      default:
        this.passcode1.nativeElement.setFocus();
    }
    // console.log(this.clave1+""+this.clave2+""+this.clave3+""+this.clave4+"");
  }
  LostPassword() {
    this.navCtl.navigateForward(["lostpassword", {}]);
  }
  validarCodigo() {
    console.log("aca");
    switch (this.proposito) {
      case 0:
        let clave = "";
        this.values.forEach(valor => {
          clave += ""+valor;
        });
        
        // this.navCtrl.navigateForward("ingresa-pin-confirma", navigationExtras);
        console.log("confirma "+clave);
        this.viewCtrl.dismiss(clave);
        break;
    }
  }
}
