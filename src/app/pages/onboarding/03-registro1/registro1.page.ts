import { LoginBoService } from '../../../service/login-bo.service';
import { ValidacionCelService } from '../../../service/validacion-cel.service';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro1',
  templateUrl: './registro1.page.html',
  styleUrls: ['./registro1.page.scss'],
})
export class Registro1Page implements OnInit {
  @ViewChild("cod_pais") cod_pais: ElementRef;
  public params;
  public codigo;
  public cargando = false;
  public errorCod = false;
  public errorCel = false;
  public codArea;
  public celular;
  public dni;
  public pfpj;
  constructor(public route: ActivatedRoute, public router: Router, private navCtrl: NavController, public validCel: ValidacionCelService, public loginBo: LoginBoService) { }

  ngOnInit() {
    let p = JSON.parse(localStorage.getItem("varsOnboarding"));
    this.pfpj = p.pfpj;
    localStorage.setItem("onboardingLastPage","registro1");
  }
  async ConfirmaSms() {
    let p = JSON.parse(localStorage.getItem("varsOnboarding"));
    this.pfpj = p.pfpj;
    let proceso_alta = localStorage.getItem("proceso_alta") != null ? localStorage.getItem("proceso_alta") : p.proceso_alta;
    await this.loginBo.login().then(async token => {
      console.log("logueado");
      console.log(this.obtener_codigo_pais() + this.codArea + this.celular);
      console.log(this.codArea);
      this.cargando = true;
      if (JSON.parse(localStorage.getItem("validaciones")).cel == false)
        await this.validCel.obtener_codigo(this.obtener_codigo_pais() + this.codArea.toString() + this.celular.toString(), token, proceso_alta).then(data => {
          //   console.log("codigo enviado");
          p["cod_pais"] = this.obtener_codigo_pais();
          p["cod_area"] = this.codArea;
          p["celular"] = this.celular;
          p["dni"] = this.dni;
          p["dni"] = this.dni;
          localStorage.setItem("varsOnboarding", JSON.stringify(p));
          // console.log(navigationExtras);
          this.cargando = false;
          this.navCtrl.navigateForward("confirmasms");
        })
          .catch(err => { console.log(err); return; });
      else{
        this.navCtrl.navigateForward("cuentacreada");
      }
        });
    // this.navCtrl.navigateForward(["confirmasms",{}]);
  }

  obtener_codigo_pais() {
    console.log(this.cod_pais.nativeElement.innerHTML);
    return this.cod_pais.nativeElement.innerHTML.replace("+", "");
  }
  validar_celular() {

    let result = (this.obtener_codigo_pais() + this.codArea + this.celular).match(/^[+]?[0-9]{2}([0-9]{2}[0-9]{8})$/);
    if (result !== null) {
      this.errorCel = false;
    }
    else {
      this.errorCel = true;
    }
  }
  ionViewDidLeave() {
    this.codigo = null;
  }
}
