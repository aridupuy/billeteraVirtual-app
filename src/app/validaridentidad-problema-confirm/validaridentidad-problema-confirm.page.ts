import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validaridentidad-problema-confirm',
  templateUrl: './validaridentidad-problema-confirm.page.html',
  styleUrls: ['./validaridentidad-problema-confirm.page.scss'],
})
export class ValidaridentidadProblemaConfirmPage implements OnInit {

  constructor(private navCtrl : NavController) { }


  ngOnInit() {
  }
  Registro(){
    this.navCtrl.navigateForward(["registro-enespera",{}]);
  }
}
