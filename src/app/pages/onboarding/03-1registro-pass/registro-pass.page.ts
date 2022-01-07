import { TerminosCondicionesPage } from '../terminos-condiciones/terminos-condiciones.page';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ValidausuarioService } from '../../../service/validausuario.service';
import { LoginBoService } from '../../../service/login-bo.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-registro-pass',
  templateUrl: './registro-pass.page.html',
  styleUrls: ['./registro-pass.page.scss'],
})
export class RegistroPassPage implements OnInit {


  showPassword = false;
  passwordToggleIcon = 'eye-outline';
  public checkterms;
  public password;
  public repassword;
  public usuario;
  public errorusuario;
  public error_password;
  public cargando = true;
  public pass_minim = false;
  public pass_has_upper = false;;
  public pass_has_number = false;;
  public pass_has_simbol = false;
  public pfpj = "";
  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword == true)
      this.passwordToggleIcon = 'eye-off-outline';
    else
      this.passwordToggleIcon = 'eye-outline';
  }

  modalDataResponse: any;

  constructor(private navCtrl: NavController, public modalCtrl: ModalController, public route: ActivatedRoute, public router: Router, public ValidausuarioService: ValidausuarioService, public loginBo: LoginBoService, public iniciaProceso: InicioProcesoService) { }

  ngOnInit() {
    localStorage.setItem("onboardingLastPage", "registro");
    let vars = Onboarding_vars.get();
    this.pfpj = vars.pfpj;
    this.usuario=vars.usuario;

  }
  validar_regex() {
    this.pass_minim = false;
    this.pass_has_upper = false;;
    this.pass_has_number = false;;
    this.pass_has_simbol = false;
    if (this.password != null) {
      if (this.password.toString().length >= 6) {
        this.pass_minim = true;
      }
      if ((this.password.toString().match(/^.*(?=\d).*$/))) {
        this.pass_has_number = true;
      }
      if ((this.password.toString().match(/^.*(?=[A-Z]).*$/))) {
        this.pass_has_upper = true;
      }
    }
    // if ((this.password.toString().match(/^.*(?=[@$!%*#?&]).*$/))) {
    //   this.pass_has_simbol = true;
    // }
    if (this.pass_minim && this.pass_has_upper && this.pass_has_number /* && this.pass_has_simbol*/) {
      this.error_password = false;
    } else {
      this.error_password = true;
    }
  }
  validar_password() {
    if (!(this.password.toString().match(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/))) {
      this.error_password = true;
    }
    if (this.password == this.repassword && this.error_password==true)
        this.error_password = false;
  }
  private tokenBo;
  async Continuar() {
    if (this.password != this.repassword) {
      this.error_password = true;
    }
    if (!this.error_password) {
      /*aca pasa a la siguiente pantalla */
      let validaciones = JSON.parse(localStorage.getItem("validaciones"));
      if (validaciones == null || validaciones.mail == null || validaciones.mail == false) {

        Onboarding_vars.add({password: this.password, terminos_acepta: this.checkterms })

        this.navCtrl.navigateForward("registro1");
      }
      else {
        return false;
      }

    }
  }
  async tycModal() {
    const modal = await this.modalCtrl.create({
      component: TerminosCondicionesPage
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : ' + modalDataResponse.data);
      }
    });

    return await modal.present();
  }
}
