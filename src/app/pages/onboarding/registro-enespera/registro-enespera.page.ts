import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-enespera',
  templateUrl: './registro-enespera.page.html',
  styleUrls: ['./registro-enespera.page.scss'],
})
export class RegistroEnesperaPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  //  localStorage.setItem("onboardingLastPage","registro-enespera");
  }
  Inicio(){
    this.navCtrl.navigateRoot("welcome");
  }
}
