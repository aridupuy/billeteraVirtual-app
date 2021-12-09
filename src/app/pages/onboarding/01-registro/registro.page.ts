import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TerminosCondicionesPage } from '../terminos-condiciones/terminos-condiciones.page';
import { LoginBoService } from '../../../service/login-bo.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { ValidacionMailService } from '../../../service/validacion-mail.service';
import { ValidacionCelService } from '../../../service/validacion-cel.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  showPassword = false;
  passwordToggleIcon = 'eye-outline';
  public checkterms;
  public password;
  public repassword;
  public email;
  public errorMail;
  public error_password;
  public cargando = true;
  public pass_minim = false;
  public pass_has_upper = false;;
  public pass_has_number = false;;
  public pass_has_simbol = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword == true)
      this.passwordToggleIcon = 'eye-off-outline';
    else
      this.passwordToggleIcon = 'eye-outline';
  }

  modalDataResponse: any;

  constructor(private navCtrl: NavController, public modalCtrl: ModalController, public route: ActivatedRoute, public router: Router,
    public validMail: ValidacionMailService,
    public iniciaProceso: InicioProcesoService, public loginBo: LoginBoService) {
    if (localStorage.getItem("onboarding") != "1") {
      localStorage.setItem("onboarding", "1");
    }



  }

  ngOnInit() {
    let pagina = localStorage.getItem("onboardingLastPage");
    if(pagina!=null)
      this.navCtrl.navigateForward(pagina);
    
 
  }
  validar_mail() {
    console.log(this.email);
    if (!this.email.toString().match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
      this.errorMail = true;
    } else {
      this.errorMail = false;
    }

  }
  validar_regex() {
    this.pass_minim = false;
    this.pass_has_upper = false;;
    this.pass_has_number = false;;
    this.pass_has_simbol = false;

    if (this.password.toString().length >= 6) {
      this.pass_minim = true;
    }
    if ((this.password.toString().match(/^.*(?=\d).*$/))) {
      this.pass_has_number = true;
    }
    if ((this.password.toString().match(/^.*(?=[A-Z]).*$/))) {
      this.pass_has_upper = true;
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
    if (this.password != this.repassword)
      this.error_password = true;
    else
      this.error_password = false;
  }
  private tokenBo;
  async Continuar() {
    if (this.email == undefined || this.email == '') {
      this.errorMail = false;
    }

    if (this.password != this.repassword) {
      this.error_password = true;
    }
    if (!this.errorMail && !this.error_password) {
      await this.loginBo.login().then(async token => {
        console.log("logueado");
        this.cargando = true;
        await this.iniciaProceso.iniciar(token, this.email).then(async (data: any) => {
          // console.log(id_proceso_alta);
          localStorage.setItem("proceso_alta", data.id_proceso_alta);
          localStorage.setItem("validaciones", JSON.stringify(data.validaciones));
          // antes que esto va un endṕoint para validar la preexistencia del mail
          let mailNoExiste = true;
          await this.validMail.existe(this.email, token).then((data) => {
            mailNoExiste = true;
          }).catch((data) => {
            mailNoExiste = false;
            this.navCtrl.navigateForward("registro-cuentaexistente");
            return false;

          })
          if (mailNoExiste) {
            if(JSON.parse(localStorage.getItem("validaciones")).mail==false)
                await this.validMail.validar(this.email, token)
                  .then(async url => {
                    console.log("mail enviado");
                    this.navCtrl.navigateForward(["registro1", {}]);
                    localStorage.setItem("varsOnboarding", JSON.stringify({ email: this.email, password: this.password, acepta: this.checkterms, proceso_alta: data.id_proceso_alta }));
                    this.cargando = false;
                    this.navCtrl.navigateForward("personapfpj");
                  }).catch(err => { console.log(err); return; })
          }
          else {
            return false;
          }
        }).catch(log => {
          this.navCtrl.navigateForward("registro-cuentaexistente");
        });
      });
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
