import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-datos-cuenta',
  templateUrl: './datos-cuenta.page.html',
  styleUrls: ['./datos-cuenta.page.scss'],
})
export class DatosCuentaPage implements OnInit {
  readonly = "true";
  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
}
