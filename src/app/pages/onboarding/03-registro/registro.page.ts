import { Component, OnInit } from '@angular/core';
import { NavController, ViewDidLeave } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TerminosCondicionesPage } from '../terminos-condiciones/terminos-condiciones.page';
import { LoginBoService } from '../../../service/login-bo.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { ValidausuarioService } from '../../../service/validausuario.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { pass } from '../../../patron.guard';
import { UsuarioService } from '../../../service/usuario.service';
import { Navigation } from 'swiper';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit,ViewDidLeave {


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

  }
  ionViewDidLeave(): void {
    this.usuario="";
  }
  async validar_usuario() {
    console.log(this.usuario);
    /* por ahora no valido usuarios*/
    await this.loginBo.login().then(async token => {
      await this.iniciaProceso.iniciar(token, this.usuario, this.pfpj).then(async (data: any) => {
        localStorage.setItem("proceso_alta", data.id_proceso_alta);
        Onboarding_vars.add({ proceso_alta: data.id_proceso_alta });
        localStorage.setItem("validaciones", JSON.stringify(data.validaciones));
        console.log(data);
        // antes que esto va un endṕoint para validar la preexistencia del mail
        await this.ValidausuarioService.validar_usuario(this.usuario, this.pfpj, token).then(data => {
          this.errorusuario = false;
          console.log(data);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ pfpj: this.pfpj,usuario:this.usuario })
            }
          };
          this.navCtrl.navigateForward("registro-cuentaexistente", navigationExtras);


        })
          .catch(err => {
            if(this.pfpj=="pj"){
                const navigationExtras: NavigationExtras = {
                queryParams: {
                  param: JSON.stringify({ pfpj: this.pfpj,error:err,usuario:this.usuario })
                }
              };
              this.navCtrl.navigateForward("registro-cuentaexistente", navigationExtras);
            }
            this.errorusuario = false;
          });
      }).catch(err => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify({ pfpj: this.pfpj,error:err,usuario:this.usuario })
          }
        };
        this.navCtrl.navigateForward("registro-cuentaexistente", navigationExtras);
      });
    }).catch(log => {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({ pfpj: this.pfpj ,usuario:this.usuario})
        }
      };
      this.navCtrl.navigateForward("registro-cuentaexistente", navigationExtras);
    });
    return true;


  }
  vire
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
    if (this.usuario == undefined || this.usuario == '') {
      this.errorusuario = false;
    }

    if (this.password != this.repassword) {
      this.error_password = true;
    }
    if (!this.errorusuario && !this.error_password) {
      /*aca pasa a la siguiente pantalla */
      let validaciones = JSON.parse(localStorage.getItem("validaciones"));
      if (validaciones == null || validaciones.mail == null || validaciones.mail == false) {

        Onboarding_vars.add({ usuario: this.usuario, password: this.password, terminos_acepta: this.checkterms })

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
