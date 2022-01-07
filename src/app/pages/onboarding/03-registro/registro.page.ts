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
  public usuario;
  public errorusuario;
  public cargando = true;
  
  public pfpj = "";
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
    if(this.usuario==undefined){
      return false;
    }
    /* por ahora no valido usuarios*/
    await this.loginBo.login().then(async token => {
      await this.iniciaProceso.iniciar(token, this.usuario, this.pfpj).then(async (data: any) => {
        localStorage.setItem("proceso_alta", data.id_proceso_alta);
        Onboarding_vars.add({ proceso_alta: data.id_proceso_alta });
        localStorage.setItem("validaciones", JSON.stringify(data.validaciones));
        console.log(data);
        // antes que esto va un endṕoint para validar la preexistencia del mail
        await this.ValidausuarioService.validar_usuario(this.usuario.toLowerCase(), this.pfpj, token).then(data => {
          this.errorusuario = false;
          console.log(data);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              param: JSON.stringify({ pfpj: this.pfpj,usuario:this.usuario , tipo:"usuario"})
            }
          };
          this.navCtrl.navigateForward("registro-cuentaexistente", navigationExtras);
        })
          .catch(err => {
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
  private tokenBo;
  async Continuar() {
    if (this.usuario == undefined || this.usuario == '') {
      this.errorusuario = false;
    }

    if (!this.errorusuario) {
      /*aca pasa a la siguiente pantalla */
      let validaciones = JSON.parse(localStorage.getItem("validaciones"));
      if (validaciones == null || validaciones.mail == null || validaciones.mail == false) {

        Onboarding_vars.add({ usuario: this.usuario })

        this.navCtrl.navigateForward("registro-pass");
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
