import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cuentaexistente-ayuda-confirm',
  templateUrl: './registro-cuentaexistente-ayuda-confirm.page.html',
  styleUrls: ['./registro-cuentaexistente-ayuda-confirm.page.scss'],
})
export class RegistroCuentaexistenteAyudaConfirmPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  Inicio(){
    this.navCtrl.navigateForward(["welcome",{}]);
  }

}
