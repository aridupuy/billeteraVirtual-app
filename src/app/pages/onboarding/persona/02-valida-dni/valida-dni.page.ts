import { Onboarding_vars } from '../../../../classes/onboarding-vars';
import { InicioProcesoService } from '../../../../service/inicio-proceso.service';
import { ValidausuarioService } from '../../../../service/validausuario.service';
import { LoginBoService } from '../../../../service/login-bo.service';
import { NavController } from '@ionic/angular';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-valida-dni',
  templateUrl: './valida-dni.page.html',
  styleUrls: ['./valida-dni.page.scss'],
})
export class ValidaDniPage implements OnInit,AfterViewInit {

  public tipodoc;
  public documento;
  public error_documento = false;
  public pass_documento = true;
  public datos;
  public longitud;
  constructor(protected navCtrl: NavController, public validUser: ValidausuarioService,
    public loginBo: LoginBoService) {


    let vars = Onboarding_vars.get();
    this.documento = vars.documento;
  }
  ngAfterViewInit(): void {
    this.datos = Onboarding_vars.get();
    this.tipodoc = "DNI";
    this.longitud =8 ;
    if(this.documento!=null && this.documento.length != this.longitud){
      this.documento=null;
    }
    localStorage.setItem("onboardingLastPage", "valida-dni");
  }
  ngOnInit() {
    this.datos = Onboarding_vars.get();
    this.tipodoc ="DNI";
    this.longitud =8;
    localStorage.setItem("onboardingLastPage", "valida-dni");

  }

  validar_documento() {
    // if (!this.documento.toString().match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
    let match = /^[0-9]{8}$/ ;
    if (this.documento && !this.documento.toString().match(match)) {
      this.error_documento = true;
      this.pass_documento = false;
    } else {
      this.error_documento = false;
      this.pass_documento = true;
    }
  }
  async Continuar() {
    console.log("aca");
    let vars = Onboarding_vars.get();
    if (vars.pfpj == "pj")
      Onboarding_vars.add({ cuit: this.documento });
    else
      Onboarding_vars.add({ documento: this.documento });
    await this.loginBo.login().then(async token => {
      console.log("logueado");
      // antes que esto va un endṕoint para validar la preexistencia del mail
      let mailNoExiste = true;
      await this.validUser.validar(this.documento, token).then((data) => {
        mailNoExiste = true;
      }).catch((data) => {
        console.log("capturado")
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify({ pfpj: vars.pfpj,documento:this.documento,tipo:"documento" })
          }
        };
        mailNoExiste=false;
        this.navCtrl.navigateForward("registro-cuentaexistente",navigationExtras);

      })
      if (mailNoExiste) {
        console.log("aca");
        return this.navCtrl.navigateForward("registro");
      }
      else {
        return false;
      }

    });

  }

}
