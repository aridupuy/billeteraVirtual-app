import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cuentaexistente-ayuda',
  templateUrl: './registro-cuentaexistente-ayuda.page.html',
  styleUrls: ['./registro-cuentaexistente-ayuda.page.scss'],
})
export class RegistroCuentaexistenteAyudaPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  Confirmar(){
    this.navCtrl.navigateForward(["registro-cuentaexistente-ayuda-confirm",{}]);
  }
}
