import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.page.html',
  styleUrls: ['./lista-amigos.page.scss'],
})
export class ListaAmigosPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  agregarAmigo(){
    
  }
  Continuar() {
    this.navCtrl.navigateForward(["pedir-amigo-desdelista",{}]);
  }
}
