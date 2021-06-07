import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cuentaexistente-no',
  templateUrl: './registro-cuentaexistente-no.page.html',
  styleUrls: ['./registro-cuentaexistente-no.page.scss'],
})
export class RegistroCuentaexistenteNoPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  Contactarme(){
    this.navCtrl.navigateForward(["registro-cuentaexistente-ayuda",{}]);
  }
  Registro(){
    this.navCtrl.navigateForward(["registro",{}]);
  }

}
