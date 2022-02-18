import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo-link2',
  templateUrl: './pedir-amigo-link2.page.html',
  styleUrls: ['./pedir-amigo-link2.page.scss'],
})
export class PedirAmigoLink2Page implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  ModificarDatos(){
    this.navCtrl.navigateBack(["pedir-amigo-link",{}]);
  }
  MisLinks() {
    this.navCtrl.navigateForward(["agenda-links",{}]);
  }
  Compartir(){}
  Finalizar(){
    this.navCtrl.navigateForward(["pedir-amigo-link3",{}]);
  }

}
