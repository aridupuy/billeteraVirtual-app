import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso-efectivo',
  templateUrl: './ingreso-efectivo.page.html',
  styleUrls: ['./ingreso-efectivo.page.scss'],
})
export class IngresoEfectivoPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }
  Home(){
    this.navCtrl.navigateForward(["home",{}]);
  }
}
