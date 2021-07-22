import { ObtenerDatosService } from '../service/obtener-datos.service';
import { Icvu } from '../interfaces/Icvu';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso-transferencia',
  templateUrl: './ingreso-transferencia.page.html',
  styleUrls: ['./ingreso-transferencia.page.scss'],
})
export class IngresoTransferenciaPage implements OnInit {

  constructor(public alertController: AlertController,public navCtrl:NavController,public datos:ObtenerDatosService,public clipboard:Clipboard) { }
  public cvu;
  public alias;
  ngOnInit() {
    this.datos.obtener_datos().then((data:Icvu)=>{
      console.log(data);
      this.cvu = data.cvu;
      this.alias = data.alias;
    }).catch(err=>{
      console.log(err);
    })
  }
  copy(data){
    this.clipboard.copy(data);
  }

  async comoTransferir() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Como realizo la transferencia?',
      message: '<p class="align-left">1. Copiá tu CVU o alias de Efectivo Digital.</p>'+'<p class="align-left">2. Ingresá a tu Home Banking y andá a la sección “Transferencias”</p>'+'<p class="align-left">3. Si es la primera vez que lo hacés, añadite como “Nuevo destinatario”, completá los datos de tu CVU o alias ¡y listo!</p>'+'<p class="align-left">4. Vas a poder elegir el monto a transferir e ingresarlo a tu cuenta de Efectivo Digital.</p>',
      buttons: [
        {
          text: ''
        },
        {
          text: 'Entendido',
          role: 'cancel',
          cssClass: 'primary'
        }
      ]
      
    });

    await alert.present();
  }
  Home(){
    this.navCtrl.navigateForward(["home",{}]);
  }
}
