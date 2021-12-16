import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PreguntasPopupPage } from '../preguntas-popup/preguntas-popup.page';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface checkboxGroup {
  pe_no: boolean,
  pe_si: boolean,
  so_si: boolean,
  so_no: boolean,
  fat_no: boolean,
  fat_si: boolean,
  grupo1: boolean,
  grupo2: boolean,
  grupo3: boolean
}
@Component({
  selector: 'app-preguntaslegales',
  templateUrl: './preguntaslegales.page.html',
  styleUrls: ['./preguntaslegales.page.scss'],
})
export class PreguntaslegalesPage implements OnInit {
  modalDataResponse: any;
  public form: checkboxGroup = {
    pe_no: null,
    pe_si: null,
    so_si: null,
    so_no: null,
    fat_no: null,
    fat_si: null,
    grupo1: null,
    grupo2: null,
    grupo3: null
  }

  constructor(public route: ActivatedRoute, public router: Router, private navCtrl: NavController, public modalCtrl: ModalController) { }

  ngOnInit() {
    localStorage.setItem("onboardingLastPage","preguntaslegales");
  }

  Continuar() {
    let p = Onboarding_vars.get();
    
    Onboarding_vars.add({
      politico_expuesto:(this.form.pe_no) ? !this.form.pe_no : this.form.pe_si,
      sujeto_obligado:(this.form.so_no) ? !this.form.so_no : this.form.so_si,
      fatca:(this.form.fat_no) ? !this.form.fat_no : this.form.fat_si
    });
    let validaciones = JSON.parse(localStorage.getItem("validaciones"));
    if ( validaciones!= null && validaciones.ident!=false && validaciones.ident!=null) {
      this.navCtrl.navigateForward("datospersonales");
    }
    else
      this.navCtrl.navigateForward("validaridentidad");
  }
  async Popup() {
    const modal = await this.modalCtrl.create({
      component: PreguntasPopupPage
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : ' + modalDataResponse.data);
      }
    });

    return await modal.present();
  }
  validar_grupo(grupo, elemento) {

    switch (grupo) {
      case 1:
        this.form.grupo1 = true;
        if (elemento == 1 && this.form.pe_si) {
          this.form.pe_si = false;
        }
        if (elemento == 2 && this.form.pe_no) {
          this.form.pe_no = false;
        }
        break;
      case 2:
        this.form.grupo2 = true;
        if (elemento == 1 && this.form.so_si) {
          this.form.so_si = false;
        }
        if (elemento == 2 && this.form.so_no) {
          this.form.so_no = false;
        }
        break;
      case 3:
        this.form.grupo3 = true;
        if (elemento == 1 && this.form.fat_si) {
          this.form.fat_si = false;
        }
        if (elemento == 2 && this.form.fat_no) {
          this.form.fat_no = false;
        }
        break;

    }

  }
}
