import { LoginBoService } from '../../../service/login-bo.service';
import { ValidacionCelService } from '../../../service/validacion-cel.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ValidacionMailService } from '../../../service/validacion-mail.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { Ivalidaciones } from '../../../interfaces/Ivalidaciones';
import { Libs } from '../../../classes/libs';
import { list } from '../../../../../platforms/android/cordova/lib/target';
import { IonInput } from '@ionic/angular';
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
  @ViewChild("celular_view") celularView:IonInput;
  public params;
  public codigo;
  public cargando = false;
  public errorCod = false;
  public errorCel = false;
  public errorMail=false;
  public mail;
  public codArea;
  public celular;
  constructor(public route: ActivatedRoute, public router: Router, private navCtrl: NavController, public validMail: ValidacionMailService, public loginBo: LoginBoService,public procesoaltaservice:InicioProcesoService) { }

  ngOnInit() {
    localStorage.setItem("onboardingLastPage","registro1");
    let p = Onboarding_vars.get();
    this.mail = p.mail;
    this.codArea=p.cod_area;
    this.cod_pais=p.cod_pais;
    this.celular=p.celular;

    this.loginBo.login().then(token=>{
      this.procesoaltaservice.validar_estado(token,localStorage.getItem("proceso_alta")).then((validaciones:Ivalidaciones)=>{
        localStorage.setItem("validaciones",JSON.stringify(validaciones));
        console.log(validaciones);
        if((validaciones.mail==true || validaciones.mail=='t') && (validaciones.cel==true || validaciones.cel=='t')){
          this.navCtrl.navigateForward("validaridentidad");   
        }
        else{
          // alert(JSON.stringify(validaciones));
        }
      })
    })
  }
  async ConfirmaSms() {
    let p = Onboarding_vars.get();
    Onboarding_vars.add({mail:this.mail,cod_pais:this.obtener_codigo_pais(),cod_area:this.codArea,celular:this.celular});
    
    let proceso_alta = localStorage.getItem("proceso_alta") != null ? localStorage.getItem("proceso_alta") : p.proceso_alta;
    await this.loginBo.login().then(async token => {
      this.cargando = true;
      let validaciones = JSON.parse(localStorage.getItem("validaciones"));
      console.log(validaciones);
      if (validaciones==null || validaciones.mail == 'f' || validaciones.mail == null || validaciones.mail==false){
        console.log(validaciones);
        return this.navCtrl.navigateForward("confirma-email");
      }
      else{
        console.log(validaciones);
        if (validaciones==null || validaciones.cel == 'f' || validaciones.cel == null || validaciones.cel == false)
          return this.navCtrl.navigateForward("confirmasms");  
        else 
          return this.navCtrl.navigateForward("validaridentidad");  
      }
        });
    // this.navCtrl.navigateForward(["confirmasms",{}]);
  }

  obtener_codigo_pais() {
    console.log(this.cod_pais.nativeElement.innerHTML);
    return this.cod_pais.nativeElement.innerHTML.replace("+", "");
  }
  validar_celular() {
    
    let libs = new Libs();
    if (libs.validar_celular(this.obtener_codigo_pais() , this.codArea , this.celular)) {
      this.errorCel = false;
    }
    else {
      this.errorCel = true;
    }
  }
  // chageFocus(event){
  //   // console.log(event.target.value);
  //   // if(event.target.value.length==1){
  //         this.celularView.setFocus();
  //   // }
  //   // return true;
  // }
  validar_mail(){

    let libs = new Libs();
    if(libs.validar_mail(this.mail.toString())){
      this.errorMail = true;
    }
    else{
      this.errorMail = false;
    }

    // if (!this.mail.toString().match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
    //   this.errorMail = true;
    // } else {
      
    // }
  }
  ionViewDidLeave() {
    this.codigo = null;
  }
}
