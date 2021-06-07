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
  }
  Legales(){
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        
        param: JSON.stringify(p)
      }
    };
    this.navCtrl.navigateForward("preguntaslegales",navigationExtras);
  }
}
