import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validaridentidad-problema',
  templateUrl: './validaridentidad-problema.page.html',
  styleUrls: ['./validaridentidad-problema.page.scss'],
})
export class ValidaridentidadProblemaPage implements OnInit {

  constructor(private navCtrl : NavController) { }


  ngOnInit() {
  }
  Continuar(){
    this.navCtrl.navigateForward(["validaridentidad-problema-confirm",{}]);
  }

}
