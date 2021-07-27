import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-retiro-transferencia',
  templateUrl: './retiro-transferencia.page.html',
  styleUrls: ['./retiro-transferencia.page.scss'],
})
export class RetiroTransferenciaPage implements OnInit {

  constructor(private NavCtrl: NavController) {}

  ngOnInit() {
  }
  nuevacuenta() {
    this.NavCtrl.navigateForward("agregar-destinatario")
  }
  destinatarios() {
    this.NavCtrl.navigateForward("lista-destinatarios");
  }
}
