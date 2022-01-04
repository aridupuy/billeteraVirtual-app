import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { LoginBoService } from '../../../service/login-bo.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { Ivalidaciones } from '../../../interfaces/Ivalidaciones';
import { RevisarfotosPage } from '../revisarfotos/revisarfotos.page';
import { Platform } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validaridentidad',
  templateUrl: './validaridentidad.page.html',
  styleUrls: ['./validaridentidad.page.scss'],
})
export class ValidaridentidadPage implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('img') img: ElementRef;
  constructor(private plt: Platform,public route: ActivatedRoute,public router: Router,private navCtrl : NavController,public loginBo: LoginBoService,public procesoaltaservice: InicioProcesoService) { }


  public imagen;

  ngOnInit() {
    localStorage.setItem("onboardingLastPage","validaridentidad");
    let p = Onboarding_vars.get();

    this.loginBo.login().then(token=>{
      this.procesoaltaservice.validar_estado(token,localStorage.getItem("proceso_alta")).then((validaciones:Ivalidaciones)=>{
        localStorage.setItem("validaciones",JSON.stringify(validaciones));
        if(validaciones.ident==true || validaciones.ident=='t'){
          this.navCtrl.navigateForward("preguntaslegales");    
        }
      })
    })

  }
  Continuar(){
      this.navCtrl.navigateForward("validaridentidad1");
  }
  
  NoPuedo(){
    this.navCtrl.navigateForward("validaridentidad-mastarde");
  }
  
}
