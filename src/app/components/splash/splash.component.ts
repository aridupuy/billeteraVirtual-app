import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {}
  Welcome(){
    this.navCtrl.navigateForward(["welcome",{}]);
  }
}
