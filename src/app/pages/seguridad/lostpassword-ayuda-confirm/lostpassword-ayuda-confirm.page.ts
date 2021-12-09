import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lostpassword-ayuda-confirm',
  templateUrl: './lostpassword-ayuda-confirm.page.html',
  styleUrls: ['./lostpassword-ayuda-confirm.page.scss'],
})
export class LostpasswordAyudaConfirmPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  Inicio(){
    this.navCtrl.navigateForward(["welcome",{}]);
  }
}
