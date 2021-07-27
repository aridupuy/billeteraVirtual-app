import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-destinatario',
  templateUrl: './agregar-destinatario.page.html',
  styleUrls: ['./agregar-destinatario.page.scss'],
})
export class AgregarDestinatarioPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  Continuar() {
    this.navCtrl.navigateForward("transferencia-monto");
  }
}
