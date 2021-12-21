import { LoginBoService } from '../../../service/login-bo.service';
import { ValidacionCelService } from '../../../service/validacion-cel.service';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CountdownComponent } from 'ngx-countdown';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { Validaridentidad1Page } from '../validaridentidad1/validaridentidad1.page';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { Ivalidaciones } from 'src/app/interfaces/Ivalidaciones';

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
  public error_code;
  public intentos=1;
  public revalidar=false;

  constructor(public AlertController: AlertController, private navCtrl: NavController, public route: ActivatedRoute, public router: Router, public validCel: ValidacionCelService, public loginBo: LoginBoService,public procesoaltaservice: InicioProcesoService) {

  }

  async ngOnInit() {
    let  p  = Onboarding_vars.get();
    this.validar_cel();
    this.telefono = p.cod_pais.toString()+p.cod_area.toString() + p.celular.toString();
    this.revalidar = p.revalidar;
    let detener = false;
    let proceso_alta = localStorage.getItem("proceso_alta") != null ? localStorage.getItem("proceso_alta") : p.proceso_alta;
    await this.loginBo.login().then(async token=>{
      await this.procesoaltaservice.validar_estado(token,proceso_alta).then((validaciones:Ivalidaciones)=>{
        localStorage.setItem("validaciones",JSON.stringify(validaciones));
        if(validaciones.cel==true || validaciones.cel=='t'){
          this.navCtrl.navigateForward("validaridentidad");    
          this.countdown.stop();
        }
        
      });
      
    await this.loginBo.login().then(async token => {
      await this.validCel.obtener_codigo(p.cod_pais.toString()+p.cod_area.toString()+p.celular.toString(), token, proceso_alta).then(data => {
        Onboarding_vars.add({valida_mail:true,proceso_alta:proceso_alta});
        
        return true;
      })
        .catch(err => { console.log(err); return; });
      });
    })
    
  }
  validar_cel(){
    let p= Onboarding_vars.get();
    
    if(p.valido_sms==true){
      this.navCtrl.navigateForward("validaridentidad");
    }
  }
  onKeyUp(event, index) {
      console.log(event);
      if(event.target.value.length != 1) {
      this.setFocus(index - 2);
    } else {
      this.values[index-1]=(event.target.value);
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
      message: 'El número que ingresaste es +' + this.telefono + '. No pudimos validarlo ahora.',
      buttons: [
        {
          text: 'Continuar',
          handler: async () => {
            this.intentos++;
            let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
            console.log(p);
            p["valida_sms"] = false;
            p["intentos"]=this.intentos;
            p["proceso_alta"] = p.proceso_alta;
            const navigationExtras: NavigationExtras = {
              queryParams: {

                param: JSON.stringify(p)
              }
            };
            console.log(navigationExtras);
            this.countdown.stop();
            if(!this.revalidar){
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
      message: 'El número que ingresaste es +' + this.telefono + '. Si necesitás modificarlo, podés hacerlo en este paso.',
      buttons: [
        {
          text: 'Modificar celular',
          handler: () => {
            this.navCtrl.navigateBack("registro1");
          }
        },
        {
          text: 'Reenviar código',
          handler: async () => {
            this.intentos++;
            console.log("Envia Codigo");
            let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
            console.log(p);
            let proceso_alta = localStorage.getItem("proceso_alta");
            await this.loginBo.login().then(async token => {
              console.log("logueado");
              // console.log(p);
              let proceso_alta = localStorage.getItem("proceso_alta")!=null?localStorage.getItem("proceso_alta"):p.proceso_alta;
              await this.validCel.obtener_codigo(p.cod_pais.toString()+p.cod_area.toString() + p.celular.toString(), token,proceso_alta).then(data => {
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
    console.log(codigo);
    console.log(this.intentos);
    let  p  = JSON.parse(localStorage.getItem("varsOnboarding"));
    console.log(p);
    let proceso_alta = p.proceso_alta!=null?p.proceso_alta:localStorage.getItem("proceso_alta");
    if (p.login) {
      console.log("REVALIDAR CODIGO");
      console.log(p);
      await this.validCel.validar_codigo_reenviado(p.cod_pais.toString()+p.cod_area.toString()+p.celular.toString(), codigo,this.intentos).then(data => {
        this.values=[];
        console.log("Valida");
        this.retornar_exito_reenviado();
        
      }).catch(err => {
        console.log("Error",err);
        this.intentos = err.intentos;
        this.values=[];
        this.retornar_error();
      })
    }
    else {
      this.loginBo.login().then(async token => {
        await this.validCel.validar_codigo(p.cod_pais.toString()+p.cod_area.toString()+p.celular.toString(), codigo, token,proceso_alta,this.intentos).then(data => {
          this.values=[];
          this.retornar_exito();
        }).catch(err => {
          console.log(err);
          this.intentos = err.intentos;
          this.values=[];
          this.retornar_error();
        })
      }).catch(err => {
        console.log(err);
        this.intentos = err.intentos;
        this.values=[];
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
  retornar_exito() {
    this.error_code = false;
    let vars  = Onboarding_vars.get();
    let  p = {};
    p["valida_sms"] = true;
    p["proceso_alta"] = vars.proceso_alta;
    Onboarding_vars.add(p);

    this.countdown.stop();
    this.navCtrl.navigateForward("cuentacreada");
  }
  retornar_error() {
    if(this.intentos>=3){
      this.cdEvents({action:"saltear"});
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