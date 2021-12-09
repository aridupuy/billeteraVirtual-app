import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cuentaexistente',
  templateUrl: './registro-cuentaexistente.page.html',
  styleUrls: ['./registro-cuentaexistente.page.scss'],
})
export class RegistroCuentaexistentePage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  Si(){
    this.navCtrl.navigateForward(["registro-cuentaexistente-si",{}]);
  }
  No(){
    this.navCtrl.navigateForward(["registro-cuentaexistente-no",{}]);
  }

}
