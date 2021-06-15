import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-pedir-amigo-link3',
  templateUrl: './pedir-amigo-link3.page.html',
  styleUrls: ['./pedir-amigo-link3.page.scss'],
})
export class PedirAmigoLink3Page implements OnInit {

  constructor(public alertController: AlertController,private navCtrl: NavController) { }

  ngOnInit() {
  }
  async GuardarLink() {
    const alert = await this.alertController.create({
     
      header: 'Link guardado con éxito',
      message: 'Mensaje a definir',
      buttons: [
        {
          text: 'Volver al inicio',
          handler: () => {
            this.navCtrl.navigateForward(["home",{}]);
          }
        },
        {
          text: 'Ver mi agenda de links',
          handler: () => {
            this.navCtrl.navigateForward(["agenda-links",{}]);
          }
        }
      ]
    });
    

    await alert.present();
  }
  SaltarPaso() {
    this.navCtrl.navigateForward(["home",{}]);
  }
  IrAtras() {
    this.navCtrl.back();
  }
}
