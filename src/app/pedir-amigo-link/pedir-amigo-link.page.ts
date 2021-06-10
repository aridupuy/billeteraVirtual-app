import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo-link',
  templateUrl: './pedir-amigo-link.page.html',
  styleUrls: ['./pedir-amigo-link.page.scss'],
})
export class PedirAmigoLinkPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  FinalizarLink() {
    this.navCtrl.navigateForward("pedir-amigo-link2");
    }
  ListaAmigos() {
  this.navCtrl.navigateForward("lista-amigos");
  }
}
