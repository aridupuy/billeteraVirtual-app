import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-amigo2',
  templateUrl: './agregar-amigo2.page.html',
  styleUrls: ['./agregar-amigo2.page.scss'],
})
export class AgregarAmigo2Page implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  AgregarAmigo() {
    this.navCtrl.navigateForward(["agregar-amigo3", {}]);
  }
}
