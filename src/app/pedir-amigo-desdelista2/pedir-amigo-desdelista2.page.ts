import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo-desdelista2',
  templateUrl: './pedir-amigo-desdelista2.page.html',
  styleUrls: ['./pedir-amigo-desdelista2.page.scss'],
})
export class PedirAmigoDesdelista2Page implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  Continuar() {
    this.navCtrl.navigateForward(["pedir-amigo-desdelista-confirm",{}]);
  }
  Modificar() {
    this.navCtrl.navigateBack(["pedir-amigo-desdelista2",{}]);
  }

}
