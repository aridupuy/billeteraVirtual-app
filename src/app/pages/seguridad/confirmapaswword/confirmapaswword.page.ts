import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { Ivalidaciones } from '../../../interfaces/Ivalidaciones';
import { ValidacionCelService } from '../../../service/validacion-cel.service';
import { LoginBoService } from '../../../service/login-bo.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { CountdownComponent } from 'ngx-countdown';
import { LoginService, Ilogin } from '../../../service/login.service';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-confirmapaswword',
  templateUrl: './confirmapaswword.page.html',
  styleUrls: ['./confirmapaswword.page.scss'],
})
export class ConfirmapaswwordPage implements OnInit {

  @ViewChild('passcode1') passcode1;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  values: any = [];
  public usuario;
  public clave1;
  public error_code;
  public showPassword=false;
  public passwordToggleIcon = 'eye-outline';
  constructor(public AlertController: AlertController, private navCtrl: NavController, public route: ActivatedRoute, public router: Router, public validCel: ValidacionCelService, public loginBo: LoginBoService,public log_in: LoginService) {

  }
  async ionViewDidEnter() {
    console.log("ViewDidEnter");
    this.usuario=Onboarding_vars.get().usuario;
    return this.ngOnInit();
    
  }
  
  togglePassword():void {
    this.showPassword =! this.showPassword;
    if (this.showPassword == true)
      this.passwordToggleIcon = 'eye-off-outline';
    else
      this.passwordToggleIcon = 'eye-outline';
  }
  async ngOnInit() {
    
    let  p  = Onboarding_vars.get();
    this.usuario=p.usuario;
    let proceso_alta = localStorage.getItem("proceso_alta") != null ? localStorage.getItem("proceso_alta") : p.proceso_alta;
    // await this.loginBo.login().then(async token=>{
    //   await this.procesoaltaservice.validar_estado(token,proceso_alta).then((validaciones:Ivalidaciones)=>{
    //     localStorage.setItem("validaciones",JSON.stringify(validaciones));
    //     if(validaciones.cel==true || validaciones.cel=='t'){
    //       this.navCtrl.navigateForward("validaridentidad");    
    //       this.countdown.stop();
    //     }
        
    //   });
      
    // await this.loginBo.login().then(async token => {
    //   await this.validCel.obtener_codigo(p.cod_pais.toString()+p.cod_area.toString()+p.celular.toString(), token, proceso_alta).then(data => {
    //     Onboarding_vars.add({valida_mail:true,proceso_alta:proceso_alta});
        
    //     return true;
    //   })
    //     .catch(err => { console.log(err); return; });
    //   });
    // })
  }
  async validar_password(){
    await this.log_in.login(this.usuario, this.clave1).then((data:Ilogin)=>{
     this.error_code=false;
     localStorage.removeItem("cuentas");
     localStorage.removeItem("nombreEmpresa");
     localStorage.removeItem("inicialesEmpresa");
     localStorage.removeItem("token");
     localStorage.removeItem("iniciales");
    // this.navCtrl.navigateForward(["home",{}]);
     let validaciones = JSON.parse(localStorage.getItem("validaciones"));
     Onboarding_vars.add({terminos_acepta:true});
      this.despachar(validaciones.mail) || this.despachar(validaciones.cel) || this.despachar(validaciones.ident,"validaridentidad");
      this.countdown.stop();
  }).catch(err=>{
    console.log(err);
    this.error_code=true;
  });
  }
  
  despachar(valid,pagina?){
    return valid? pagina!=undefined?this.navCtrl.navigateForward(pagina) :this.navCtrl.navigateForward("registro1"):false;
  }
  cdEvents(event) {
    // console.log(event);
    switch (event.action) {
      case "done":
        this.PopupCode("Se termino el tiempo por favor reintentá");
        break;
      case "saltear":
        this.PopupCodeSaltear("No pudimos validar tu identidad, intentaremos mas adelante.");
        break;
      default:
        break;
    }
  }
  async PopupCodeSaltear(mensaje) {
    if (!mensaje) {
      mensaje = '¿No te acordas la contraseña?';
    }
    const alert = await this.AlertController.create({
      header: mensaje,
      subHeader: 'Necesitamos que la reestablescas para continuar',
      message: '',
      buttons: [
        {
          text: 'Olvide mi contraseña',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({usuario:this.usuario, logued:false})
              }
            }
            this.navCtrl.navigateForward("lostpassword",navigationExtras);
          }
        },
        {
          text: 'Reintentar',
          handler: () => {
            this.ngOnInit();
          }
        },
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  async PopupCode(mensaje) {
    if (!mensaje) {
      mensaje = '¿No te acordas la contraseña?';
    }
    const alert = await this.AlertController.create({
      header: mensaje,
      subHeader: 'Necesitamos que la reestablescas para continuar',
      message: '',
      buttons: [
        {
          text: 'Olvide mi contraseña',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({usuario:this.usuario, logued:false})
              }
            }
            this.navCtrl.navigateForward("lostpassword",navigationExtras);
          }
        },]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  
  retornar_exito_reenviado() {
   
  }
  retornar_exito() {
  }
  retornar_error() {
  }
  IrAtras(){
    let onboarding = localStorage.getItem("onboarding");
    if(onboarding=="1")
      this.navCtrl.navigateBack("registro1");
    else history.back();
  }

}
