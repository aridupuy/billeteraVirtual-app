import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-cuentacreada',
  templateUrl: './cuentacreada.page.html',
  styleUrls: ['./cuentacreada.page.scss'],
})
export class CuentacreadaPage implements OnInit {

  constructor(private navCtrl : NavController,public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    localStorage.setItem("onboardingLastPage","cuentacreada");
  }
  Legales(){
    this.navCtrl.navigateForward("preguntaslegales");
  }
}
