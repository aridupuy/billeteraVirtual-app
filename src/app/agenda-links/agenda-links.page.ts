import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agenda-links',
  templateUrl: './agenda-links.page.html',
  styleUrls: ['./agenda-links.page.scss'],
})
export class AgendaLinksPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  Finalizar(){
    this.navCtrl.navigateBack(["pedir-amigo-link3",{}]);
  }
  CrearNuevo() {
    this.navCtrl.navigateForward(["pedir-amigo-link",{}]);
  }
  
}
