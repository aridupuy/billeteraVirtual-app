import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cambiarcuenta',
  templateUrl: './cambiarcuenta.page.html',
  styleUrls: ['./cambiarcuenta.page.scss'],
})
export class CambiarcuentaPage implements OnInit {

  constructor(public modalCtrl:ModalController) { }
  
  public cuentas
  ngOnInit() {
    this.cuentas = JSON.parse(localStorage.getItem("cuentas"));

  }
  cambiar(cuenta){
    console.log(cuenta);
    localStorage.setItem("token",cuenta.token);
    this.modalCtrl.dismiss();
    
  }
  get_iniciales(cuenta){
    return cuenta.iniciales;
  }
  get_dato(cuenta){
    return cuenta.dato;
  }
  get_titular(cuenta){
    return cuenta.titular.toString().replaceAll(","," ");
  }
}
