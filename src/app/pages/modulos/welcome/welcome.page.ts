import { Observable } from '../../../classes/observable';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private navCtrl : NavController) {}

  ngOnInit() {
    console.log("aca");
    Observable.notify("SlashHide",false);
  }
  Registrarse(){
    this.navCtrl.navigateForward(["personapfpj",{}]);
  }
  Ingreso() {
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
}
