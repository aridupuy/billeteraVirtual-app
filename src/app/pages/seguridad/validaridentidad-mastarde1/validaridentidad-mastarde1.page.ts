import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavController, Platform } from '@ionic/angular';
import { platform } from 'os';
import { Onboarding_vars } from '../../../classes/onboarding-vars';

@Component({
  selector: 'app-validaridentidad-mastarde1',
  templateUrl: './validaridentidad-mastarde1.page.html',
  styleUrls: ['./validaridentidad-mastarde1.page.scss'],
})
export class ValidaridentidadMastarde1Page implements OnInit {

  constructor(private navCtrl: NavController,public platfrom: Platform, private screenOrientation: ScreenOrientation) { }


  ngOnInit() {
    localStorage.setItem("onboardingLastPage", "validaridentidad-mastarde1");
  }
  async ValidarIdentidad() {
    let p = Onboarding_vars.get();
    let nav = p.pfpj=="pf"?"datospersonales" : "empresa/datospersonales";
    if(this.platfrom.is("cordova"))
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(
        async () => {
          this.navCtrl.navigateRoot(nav);
        }
      );
    else{
      this.navCtrl.navigateRoot(nav);
    }
  }
}
