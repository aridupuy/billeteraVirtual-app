import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CountdownComponent } from 'ngx-countdown';
import { RegistroService } from '../../../service/registro.service';

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
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  public values = [];
  public selectMail;
  public selectTel;
  public usuario;
  public ofus;
  public ofustel;
  public enviado;
  public changeMail;
  public changeTel;
  constructor(public AlertController: AlertController, private navCtrl: NavController, public route: ActivatedRoute, public register: RegistroService) { }

  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.usuario = p.usuario;
    this.selectMail = p.selectmail;
    this.selectTel = p.selectTel;
    this.ofus = p.ofus;
    this.ofustel = p.ofustel;
    this.changeMail = p.change_mail;
    this.changeTel = p.change_cel;
    console.log("aca1");
    console.log(p);
    this.enviado = this.selectMail ? this.ofus : this.ofustel;
    if (this.selectTel || this.selectMail) {
      console.log("aca2");
      this.register.enviar_codigo(this.selectMail, this.selectTel, this.usuario, this.changeMail, this.changeTel).then(data => {

      });
    }
    if (this.selectMail)
      this.enviado = this.usuario
    if (this.selectTel)
      this.enviado = this.ofustel;
  }
  cdEvents(event) {
    // console.log(event);
    switch (event.action) {
      case "done":
        this.PopupCode("Se termino el tiempo por favor reintentá");
        break;
      default:
        break;
    }
  }


  onKeyUp(event, index) {
    console.log(event.target.value);
    if (event.target.value == "") {
      this.values.splice(index - 1, 1);
    }
    if (event.target.value.length != 1) {
      this.setFocus(index - 2);
    } else {
      this.values[index - 1] = (event.target.value);
      this.setFocus(index);
    }
    console.log(this.values);
    event.stopPropagation();
  }
  setFocus(index) {

    switch (index) {
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
  async PopupCode(mensaje?) {
    let enviado = this.selectMail ? this.ofus : this.ofustel;
    const alert = await this.AlertController.create({
      header: '¿No te llegó el código o no pudiste cargarlo?',
      subHeader: 'Vamos a enviarte otro',
      message: 'Te vamos a mandar un nuevo código a ' + enviado + '. Si no tenés acceso a ese mail, podés elegir otras opciones para recibirlo.',
      buttons: [
        {
          text: 'Recibir código',
          handler: () => {
            let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
            const navigationExtras: NavigationExtras = {
              queryParams: {

                param: JSON.stringify(p)
              }
            }

            this.navCtrl.navigateBack("lostpassword", navigationExtras);
            this.countdown.stop();
          }
        },
        {
          text: 'Reenviar código',
          handler: () => {
            this.values = [];
            this.error_code = true;
            this.countdown.restart();
            this.ngOnInit();
          }
        },
        {
          text: 'Necesito ayuda',
          handler: () => {
            this.countdown.stop();
            this.navCtrl.navigateForward("lostpassword-ayuda");
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  Confirmar() {
    let codigo = this.values[0].toString() + this.values[1] + this.values[2].toString() + this.values[3];
    this.register.validar_codigo(codigo, this.usuario).then((data: any) => {

      this.retornar_exito(data.data.id_usuario);
    }).catch(err => {
      this.retornar_error();
    })




  }
  retornar_exito(id_usuario) {

    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);

    const navigationExtras: NavigationExtras = {
      queryParams: {

        param: JSON.stringify({ id_usuario: id_usuario })
      }
    };
    // console.log(navigationExtras);
    this.values = [];
    this.countdown.stop();
    if (this.changeMail)
    return  this.navCtrl.navigateBack("changemail", navigationExtras);
    if (this.changeTel)
      return this.navCtrl.navigateBack("changecel", navigationExtras);
    else
      return  this.navCtrl.navigateForward("lostpassword-confirma", navigationExtras);
  }
  public error_code;
  retornar_error() {
    this.values = [];
    this.error_code = true;
  }
}
