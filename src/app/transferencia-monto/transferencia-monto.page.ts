import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transferencia-monto',
  templateUrl: './transferencia-monto.page.html',
  styleUrls: ['./transferencia-monto.page.scss'],
})
export class TransferenciaMontoPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  customActionSheetOptions: any = {
    
  };
  Continuar() {
    this.navCtrl.navigateForward("selecciona-metodo-pago")
  }
}
