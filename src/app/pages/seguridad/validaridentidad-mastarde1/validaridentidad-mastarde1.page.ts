import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavController, Platform } from '@ionic/angular';
import { platform } from 'os';

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

    if(this.platfrom.is("cordova"))
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(
        async () => {
          this.navCtrl.navigateRoot("datospersonales");
        }
      );
    else{
      this.navCtrl.navigateRoot("datospersonales");
    }
  }
}
