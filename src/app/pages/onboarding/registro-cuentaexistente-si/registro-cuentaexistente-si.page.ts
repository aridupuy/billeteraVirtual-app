import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cuentaexistente-si',
  templateUrl: './registro-cuentaexistente-si.page.html',
  styleUrls: ['./registro-cuentaexistente-si.page.scss'],
})
export class RegistroCuentaexistenteSiPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  LostPassword(){
    this.navCtrl.navigateForward(["lostpassword",{}]);
  }
  Ingreso(){
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
  Reintentar(){
    this.navCtrl.navigateForward(["registro",{}]);
  }
}
