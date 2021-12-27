import { ValidacionCelService } from '../../../service/validacion-cel.service';
import { LoginBoService, proceso } from '../../../service/login-bo.service';
import { CountdownComponent } from 'ngx-countdown';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ValidacionMailService } from '../../../service/validacion-mail.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController, ViewDidEnter } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Ivalidaciones } from 'src/app/interfaces/Ivalidaciones';

@Component({
  selector: 'app-confirma-email',
  templateUrl: './confirma-email.page.html',
  styleUrls: ['./confirma-email.page.scss'],
})
export class ConfirmaEmailPage implements OnInit,ViewDidEnter {

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
  public mail
  public error_code;
  public intentos = 1;
  public revalidar = false;

  constructor(public AlertController: AlertController, private navCtrl: NavController, public route: ActivatedRoute, public router: Router, public validMail: ValidacionMailService, public validCel: ValidacionCelService, public loginBo: LoginBoService,public procesoaltaservice:InicioProcesoService) {

  }
  ionViewDidEnter(): void {
    let p = Onboarding_vars.get();
    console.log(p);
    this.mail = p.mail.toString();
  }
  async ngOnInit() {
    let p = Onboarding_vars.get();
    console.log(p);
    this.mail = p.mail.toString();
    this.revalidar = p.revalidar;
    let detener = false;
    console.log("Envia Codigo");
    console.log(p);
    let proceso_alta = localStorage.getItem("proceso_alta") != null ? localStorage.getItem("proceso_alta") : p.proceso_alta;
    await  this.loginBo.login().then(async token=>{
      this.procesoaltaservice.validar_estado(token,proceso_alta).then((validaciones:Ivalidaciones)=>{
        localStorage.setItem("validaciones",JSON.stringify(validaciones));
        if(validaciones.mail==true || validaciones.mail=='t'){
          this.navCtrl.navigateForward("confirmasms");    
          this.countdown.stop();
        }
      })
      await this.validMail.validar(this.mail.toString(), token, proceso_alta).then(data => {
        
      })
        .catch(err => { console.log(err); return; });
    })
    
  }
  onKeyUp(event, index) {
    console.log(event);
    if (event.target.value.length != 1) {
      this.setFocus(index - 2);
    } else {
      this.values[index - 1] = (event.target.value);
      this.setFocus(index);
    }
    event.stopPropagation();
    console.log(this.values);
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

  cdEvents(event) {
    // console.log(event);
    switch (event.action) {
      case "done":
        this.PopupCode("Se termino el tiempo por favor reintentá");
        break;
      case "saltear":
        this.PopupCodeSaltear("No pudimos validar tu celular, intentaremos mas adelante.");
        break;
      default:
        break;
    }
  }
  async PopupCodeSaltear(mensaje) {
    const alert = await this.AlertController.create({
      header: mensaje,
      subHeader: 'Intentaremos mas adelante',
      message: 'El E-mail que ingresaste es +' + this.mail + '. No pudimos validarlo ahora.',
      buttons: [
        {
          text: 'Continuar',
          handler: async () => {
            this.intentos++;
            let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
            console.log(p);
            p["valida_sms"] = false;
            p["intentos"] = this.intentos;
            p["proceso_alta"] = p.proceso_alta;
            const navigationExtras: NavigationExtras = {
              queryParams: {

                param: JSON.stringify(p)
              }
            };
            console.log(navigationExtras);
            this.countdown.stop();
            if (!this.revalidar) {
              this.navCtrl.navigateForward("cuentacreada", navigationExtras);
              return true;
            }
            else
              this.navCtrl.navigateForward("home");

          }
        },]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  async PopupCode(mensaje) {
    if (!mensaje) {
      mensaje = '¿No te llegó el código o no pudiste cargarlo?';
    }
    const alert = await this.AlertController.create({
      header: mensaje,
      subHeader: 'Vamos a enviarte otro',
      message: 'El E-mail que ingresaste es +' + this.mail + '. Si necesitás modificarlo, podés hacerlo en este paso.',
      buttons: [
        {
          text: 'Modificar Email',
          handler: () => {
            this.navCtrl.navigateForward("modificar-mail");
          }
        },
        {
          text: 'Reenviar código',
          handler: async () => {
            this.intentos++;
            console.log("Envia Codigo");
            let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
            console.log(p);
            await this.loginBo.login().then(async token => {
              console.log("logueado");
              // console.log(p);
              let proceso_alta = localStorage.getItem("proceso_alta") != null ? localStorage.getItem("proceso_alta") : p.proceso_alta;
              await this.validMail.reenviar().then(data => {
                console.log("codigo enviado");
                this.clave1 = this.clave2 = this.clave3 = this.clave4 = this.clave5 = this.clave6 = null;
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
    let codigo = this.clave1.toString() + this.clave2 + this.clave3.toString() + this.clave4 + this.clave5.toString() + this.clave6;
    
    let p = Onboarding_vars.get();
    let proceso_alta = p.proceso_alta;
    if (p.login) {
      await this.validMail.validar_codigo_reenviado(p.mail.toString(), codigo).then(data => {
        this.values = [];
        console.log("Valida");
        this.retornar_exito_reenviado();

      }).catch(err => {
        console.log("Error", err);
        this.intentos = err.intentos;
        this.values = [];
        this.retornar_error();
      })
    }
    else {
      console.log("aca confirma email-");
      this.loginBo.login().then(async token => {
        await this.validMail.validar_codigo(p.mail.toString(), codigo, token, localStorage.getItem("proceso_alta"), this.intentos).then(data => {
          this.values = [];
          this.retornar_exito();
        }).catch(err => {
          this.intentos = err.intentos;
          this.values = [];
          this.retornar_error();
        })
      }).catch(err => {
        this.intentos = err.intentos;
        this.values = [];
        this.retornar_error();
      });
      // this.navCtrl.navigateForward(["cuentacreada",{}]);
    }

  }
  retornar_exito_reenviado() {
    this.error_code = false;
    this.countdown.stop();
    this.navCtrl.navigateForward("/");
  }
  async retornar_exito() {
    this.error_code = false;
    this.countdown.stop();
    let p = Onboarding_vars.get();
    this.navCtrl.navigateForward("confirmasms");
    
    
    // this.navCtrl.navigateForward("validaridentidad");
    return true;
  }
  retornar_error() {
    if (this.intentos >= 3) {
      this.cdEvents({ action: "saltear" });
    }
    this.error_code = true;
  }
  IrAtras(){
    let onboarding = localStorage.getItem("onboarding");
    if(onboarding=="1")
      this.navCtrl.navigateBack("registro1");
    else history.back();
  }
}
