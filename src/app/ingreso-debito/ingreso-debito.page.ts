import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso-debito',
  templateUrl: './ingreso-debito.page.html',
  styleUrls: ['./ingreso-debito.page.scss'],
})
export class IngresoDebitoPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  SeleccionaTarjeta(){
    this.navCtrl.navigateForward(["ingreso-debito2",{}]);
  }
}
