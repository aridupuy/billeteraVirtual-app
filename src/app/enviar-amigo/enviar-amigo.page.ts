import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-enviar-amigo',
  templateUrl: './enviar-amigo.page.html',
  styleUrls: ['./enviar-amigo.page.scss'],
})
export class EnviarAmigoPage implements OnInit {
  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    
  }
  CrearLink() {
    this.navCtrl.navigateForward("enviar-amigo-link");
    }
  ListaAmigos() {
  this.navCtrl.navigateForward("lista-amigos-env");
  }
}
