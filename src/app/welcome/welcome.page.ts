import { AppComponent } from '../app.component';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private navCtrl : NavController) {
    AppComponent.cargando = false;
  }

  ngOnInit() {
  }
  Registrarse(){
    this.navCtrl.navigateForward(["registro",{}]);
  }
  Ingreso() {
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
}
