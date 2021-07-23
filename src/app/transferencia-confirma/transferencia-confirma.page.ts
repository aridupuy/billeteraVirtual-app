import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transferencia-confirma',
  templateUrl: './transferencia-confirma.page.html',
  styleUrls: ['./transferencia-confirma.page.scss'],
})
export class TransferenciaConfirmaPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  Continuar() {
    this.navCtrl.navigateForward("success");
  }
  editarDestinatario(){
    this.navCtrl.navigateBack("retiro-transferencia")

  }
  editarCampos() {
    this.navCtrl.navigateBack("transferencia-monto")
  }
}
