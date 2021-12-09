import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validaridentidad-mastarde1',
  templateUrl: './validaridentidad-mastarde1.page.html',
  styleUrls: ['./validaridentidad-mastarde1.page.scss'],
})
export class ValidaridentidadMastarde1Page implements OnInit {

  constructor(private navCtrl : NavController) { }


  ngOnInit() {
  }
  ValidarIdentidad(){
    this.navCtrl.navigateForward(["validaridentidad",{}]);
  }

}
