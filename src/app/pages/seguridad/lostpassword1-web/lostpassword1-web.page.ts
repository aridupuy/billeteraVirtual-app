import { Lostpassword1Page } from '../lostpassword1/lostpassword1.page';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lostpassword1-web',
  templateUrl: './lostpassword1-web.page.html',
  styleUrls: ['./lostpassword1-web.page.scss'],
})
export class Lostpassword1WebPage extends Lostpassword1Page {
 
  retornar_exito(id_usuario) {

    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);

    const navigationExtras: NavigationExtras = {
      queryParams: {

        param: JSON.stringify({ usuario: this.usuario,id_usuario:id_usuario })
      }
    };
    // console.log(navigationExtras);
    this.values = [];
    this.countdown.stop();
    return  this.navCtrl.navigateForward("lostpasswordconfirma-web", navigationExtras);
  }
}
