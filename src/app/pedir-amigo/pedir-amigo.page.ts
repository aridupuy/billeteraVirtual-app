import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo',
  templateUrl: './pedir-amigo.page.html',
  styleUrls: ['./pedir-amigo.page.scss'],
})
export class PedirAmigoPage implements OnInit {
  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    
  }
  CrearLink() {
    this.navCtrl.navigateForward("pedir-amigo-link");
    }
  ListaAmigos() {
  this.navCtrl.navigateForward("lista-amigos");
  }
}
