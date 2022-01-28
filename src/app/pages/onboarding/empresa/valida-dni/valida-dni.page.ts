import { ValidaDniPage as VD } from '../../persona/02-valida-dni/valida-dni.page';
import { Onboarding_vars } from '../../../../classes/onboarding-vars';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-valida-dni',
  templateUrl: './valida-dni.page.html',
  styleUrls: ['./valida-dni.page.scss'],
})
export class ValidaDniPage extends VD {
  
  ngAfterViewInit(): void {
    this.datos = Onboarding_vars.get();
    this.tipodoc = "CUIT";
    this.longitud = 11;
    if(this.documento!=null && this.documento.length != this.longitud){
      this.documento=null;
    }
    localStorage.setItem("onboardingLastPage", "empresa/valida-dni");
  }
  ngOnInit() {
    this.datos = Onboarding_vars.get();
    this.tipodoc =  "CUIT";
    this.longitud =  11;
    localStorage.setItem("onboardingLastPage", "empresa/valida-dni");

  }

  validar_documento() {
    let match = /^[0-9]{11}$/;
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
    Onboarding_vars.add({ cuit: this.documento });
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
