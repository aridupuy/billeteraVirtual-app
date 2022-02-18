import { Component, OnInit } from '@angular/core';
import { Libs } from 'src/app/classes/libs';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-modificar-mail',
  templateUrl: './modificar-mail.page.html',
  styleUrls: ['./modificar-mail.page.scss'],
})
export class ModificarMailPage implements OnInit {

  public  mail;
  public  errorMail;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  Confirma(){
    Onboarding_vars.add({mail:this.mail})
    return this.navCtrl.navigateForward("confirma-email");

  }
  valida_mail(){
    let libs = new Libs();
    if(libs.validar_mail(this.mail)){
      this.errorMail=true;
    }
    else{
      this.errorMail=false;
    }
  }
}
