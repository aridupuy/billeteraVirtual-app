import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validaridentidad-mastarde',
  templateUrl: './validaridentidad-mastarde.page.html',
  styleUrls: ['./validaridentidad-mastarde.page.scss'],
})
export class ValidaridentidadMastardePage implements OnInit {

  constructor(private navCtrl : NavController) { }


  ngOnInit() {
    localStorage.setItem("onboardingLastPage","validaridentidad-mastarde");
  }
  FotosExistentes(){
    this.navCtrl.navigateForward(["validaridentidad-fotosexistentes",{}]);
  }
  MasTarde(){
    this.navCtrl.navigateForward(["validaridentidad-mastarde1",{}]);
  }
  Problema(){
    this.navCtrl.navigateForward(["validaridentidad-problema",{}]);
  }
  subir(){
    Onboarding_vars.add({platform:"manual"});
    this.navCtrl.navigateForward("revisarfotos");
  }
}
