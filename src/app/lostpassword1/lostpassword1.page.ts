import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-lostpassword1',
  templateUrl: './lostpassword1.page.html',
  styleUrls: ['./lostpassword1.page.scss'],
})
export class Lostpassword1Page implements OnInit {
  @ViewChild('passcode1') passcode1;
  @ViewChild('passcode2') passcode2;
  @ViewChild('passcode3') passcode3;
  @ViewChild('passcode4') passcode4;
  values:any=[];
  constructor(public AlertController: AlertController,private navCtrl : NavController) { }

  ngOnInit() {
  }
  onKeyUp(event,index){  
    console.log(event);
    if(event.target.value.length !=1){
      this.setFocus(index-2);  
    }else{
      this.values.push(event.target.value);  
      this.setFocus(index);   
    }
    event.stopPropagation();
  }
  setFocus(index){
       
    switch(index){
      case 0:
      this.passcode1.setFocus();
      break;
      case 1:
      this.passcode2.setFocus();
      break;
      case 2:
      this.passcode3.setFocus();
      break;
      case 3:
      this.passcode4.setFocus();
      break;
      }
  }
  async PopupCode() {
    const alert = await this.AlertController.create({
      header: '¿No te llegó el código o no pudiste cargarlo?',
      subHeader: 'Vamos a enviarte otro',
      message: 'Te vamos a mandar un nuevo código a brucexx@xx.com. Si no tenés acceso a ese mail, podés elegir otras opciones para recibirlo.',
      buttons: [
        {
          text: 'Recibir código por SMS',
          handler: () => {
            console.log("ENVIA CODIGO POR SMS");
          }
        },
        {
          text: 'Reenviar código',
          handler: () => {
            console.log("Envia Codigo");
          }
        },
        {
          text: 'Necesito ayuda',
          handler: () => {
            this.navCtrl.navigateForward(["lostpassword-ayuda",{}]);
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  Confirmar(){
    this.navCtrl.navigateForward(["lostpassword-confirma",{}]);
  }
}
