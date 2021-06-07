import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private navCtrl : NavController) {}

  ngOnInit() {
  }
  Welcome(){
    this.navCtrl.navigateForward(["welcome",{}]);
  }
}
