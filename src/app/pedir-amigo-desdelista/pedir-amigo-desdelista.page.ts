import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo-desdelista',
  templateUrl: './pedir-amigo-desdelista.page.html',
  styleUrls: ['./pedir-amigo-desdelista.page.scss'],
})
export class PedirAmigoDesdelistaPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  Continuar() {
    this.navCtrl.navigateForward(["pedir-amigo-desdelista2",{}]);
  }
  Modificar() {
    this.navCtrl.navigateBack(["lista-amigos",{}]);
  }
}
