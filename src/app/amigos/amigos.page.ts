import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  pedirdinero() {
  this.navCtrl.navigateForward("pedir-amigo");
  }
  enviardinero() {
  this.navCtrl.navigateForward("enviar-amigo");
  }
}
