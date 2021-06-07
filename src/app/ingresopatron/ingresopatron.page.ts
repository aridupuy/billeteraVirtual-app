import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-ingresopatron',
  templateUrl: './ingresopatron.page.html',
  styleUrls: ['./ingresopatron.page.scss'],
})
export class IngresopatronPage implements OnInit {

  
  constructor(private navCtrl : NavController,private platform: Platform,private faio: FingerprintAIO) {

  }


  ionViewDidEnter() {

    this.faio.isAvailable().then((result: any) => {
      console.log(result)

      this.faio.show({
        cancelButtonTitle: 'Cancelar',
        description: "Usá tu huella para iniciar sesión e ingresar a la app.",
        disableBackup: false,
        title: 'Hola NombreUsuario',
        fallbackButtonTitle: 'Atras',
      })
        .then((result: any) => {
          console.log(result)
          this.navCtrl.navigateForward(["home",{}]);
        })
        
    })
      .catch((error: any) => {
        this.navCtrl.navigateForward(["ingreso",{}]);
      });
  }
  ngOnInit() {
   
  }
  Ingresar(){
    this.navCtrl.navigateForward(["home",{}]);
  }
  LostPassword(){
    this.navCtrl.navigateForward(["lostpassword",{}]);
  }
  
}
