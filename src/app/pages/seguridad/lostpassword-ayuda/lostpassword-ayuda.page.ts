import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lostpassword-ayuda',
  templateUrl: './lostpassword-ayuda.page.html',
  styleUrls: ['./lostpassword-ayuda.page.scss'],
})
export class LostpasswordAyudaPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  Confirmar(){
    this.navCtrl.navigateForward(["lostpassword-ayuda-confirm",{}]);
  }
}
