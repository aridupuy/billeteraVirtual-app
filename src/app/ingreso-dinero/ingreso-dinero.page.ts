import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso-dinero',
  templateUrl: './ingreso-dinero.page.html',
  styleUrls: ['./ingreso-dinero.page.scss'],
})
export class IngresoDineroPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  transferencia() {
    this.navCtrl.navigateForward(["ingreso-transferencia",{}]);
  }
  efectivo() {
    this.navCtrl.navigateForward(["ingreso-efectivo",{}]);
  }
  tarjetadebito() {
    this.navCtrl.navigateForward(["ingreso-debito",{}]);
  }
  pedirdinero() {
    this.navCtrl.navigateForward(["pedir-amigo",{}]);
  }
}
