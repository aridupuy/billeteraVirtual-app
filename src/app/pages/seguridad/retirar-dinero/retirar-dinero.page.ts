import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-retirar-dinero',
  templateUrl: './retirar-dinero.page.html',
  styleUrls: ['./retirar-dinero.page.scss'],
})
export class RetirarDineroPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  transferencia() {
    this.navCtrl.navigateForward("retiro-transferencia");
  }
  efectivo() {
    this.navCtrl.navigateForward("retiro-efectivo");
  }
  enviardinero() {
    this.navCtrl.navigateForward("enviar-amigo");
  }
}
