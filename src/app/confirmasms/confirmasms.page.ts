import { LoginBoService } from '../service/login-bo.service';
import { ValidacionCelService } from '../service/validacion-cel.service';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-confirmasms',
  templateUrl: './confirmasms.page.html',
  styleUrls: ['./confirmasms.page.scss'],
})

export class ConfirmasmsPage implements OnInit {
  @ViewChild('passcode1') passcode1;
  @ViewChild('passcode2') passcode2;
  @ViewChild('passcode3') passcode3;
  @ViewChild('passcode4') passcode4;
  @ViewChild('passcode5') passcode5;
  @ViewChild('passcode6') passcode6;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  
  values: any = [];
  public clave1
  public clave2
  public clave3
  public clave5
  public clave4
  public clave6
  public telefono
  public error_code

  constructor(public AlertController: AlertController, private navCtrl: NavController, public route: ActivatedRoute, public router: Router, public validCel: ValidacionCelService, public loginBo: LoginBoService) {
    
  }

  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    this.telefono = p.cod_area.toString() + p.celular.toString();
    
    let detener = false;
    
  }
  
  onKeyUp(event, index) {
    console.log(event);
    if (event.target.value.length != 1) {
      this.setFocus(index - 2);
    } else {
      this.values.push(event.target.value);
      this.setFocus(index);
    }
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
        case 4:
        this.passcode5.setFocus();
        break;
        case 5:
        this.passcode6.setFocus();
        break;
        
        break;
      default:
        this.passcode1.setFocus();
    }
  }

  cdEvents(event){
    console.log(event);
    switch(event.action){
      case "done":
        this.PopupCode("Se termino el tiempo por favor reintentá");
        break;
      default:
        break;
    }
  }

  async PopupCode(mensaje) {
    if(!mensaje){
      mensaje='¿No te llegó el código o no pudiste cargarlo?';
    }
    const alert = await this.AlertController.create({
      header: mensaje,
      subHeader: 'Vamos a enviarte otro',
      message: 'El número que ingresaste es '+this.telefono+'. Si necesitás modificarlo, podés hacerlo en este paso.',
      buttons: [
        {
          text: 'Modificar celular',
          handler: () => {
            this.navCtrl.back();
          }
        },
        {
          text: 'Reenviar código',
          handler: async () => {
            console.log("Envia Codigo");
            let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
            console.log(p);
            let proceso_alta = localStorage.getItem("proceso_alta");
            await this.loginBo.login().then(async token => {
              console.log("logueado");
              await this.validCel.obtener_codigo(p.codArea + p.celular, token).then(data => {
                console.log("codigo enviado");
                this.clave1= this.clave2 = this.clave3= this.clave4 = this.clave5= this.clave6 = null;
                this.countdown.restart();
              })
                .catch(err => { console.log(err); return; });
            });
          }
        },]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  async validarCodigo() {
    let codigo = this.clave1.toString() + this.clave2 + this.clave3.toString() + this.clave4 + this.clave5.toString()+this.clave6;
    console.log(codigo);
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    let proceso_alta = localStorage.getItem("proceso_alta");
    if (p.login) {
      // await this.validCel.validar_codigo_reenviado(p.cel, codigo).then(data => {

        this.retornar_exito_reenviado();
      // }).catch(err => {

        // this.retornar_error();
      // })
    }
    else {
      // await this.validCel.validar_codigo(p.cod_area + p.celular, codigo, proceso_alta).then(data => {
        this.retornar_exito();
      // }).catch(err => {
        // this.retornar_error();
      // })
      // this.navCtrl.navigateForward(["cuentacreada",{}]);
    }

  }
  retornar_exito_reenviado() {
    this.error_code = false;
  }
  retornar_exito() {
    this.error_code = false;
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    p["valida_sms"]=true;
    p["proceso_alta"]=localStorage.getItem("id_proceso_alta");
    const navigationExtras: NavigationExtras = {
      queryParams: {
        
        param: JSON.stringify(p)
      }
    };
    console.log(navigationExtras);
    this.countdown.stop();
    this.navCtrl.navigateForward("cuentacreada", navigationExtras);
  }
  retornar_error() {
    this.error_code = true;
  }
}