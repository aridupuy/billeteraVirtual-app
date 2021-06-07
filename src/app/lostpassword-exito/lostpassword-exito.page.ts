import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lostpassword-exito',
  templateUrl: './lostpassword-exito.page.html',
  styleUrls: ['./lostpassword-exito.page.scss'],
})
export class LostpasswordExitoPage implements OnInit {

  constructor(private navCtrl : NavController) {}

  ngOnInit() {
  }
  Ingresar(){
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
}
