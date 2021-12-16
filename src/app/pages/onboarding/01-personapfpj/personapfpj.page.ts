import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-personapfpj',
  templateUrl: './personapfpj.page.html',
  styleUrls: ['./personapfpj.page.scss'],
})
export class PersonapfpjPage implements OnInit {
  params;
  constructor(public route: ActivatedRoute, public router: Router,private navCtrl : NavController,private renderer: Renderer2) { 

    if (localStorage.getItem("onboarding") != "1") {
      localStorage.setItem("onboarding", "1");
    }
  }

  ngOnInit() {
    this.params  = Onboarding_vars.get();
    console.log(this.params);
    
    let pagina = localStorage.getItem("onboardingLastPage");
    if(pagina!=null)
      this.navCtrl.navigateForward(pagina);
  }
  validar(pfpj){
    Onboarding_vars.add({"pfpj":pfpj})
    this.navCtrl.navigateForward("valida-dni");
  }
  Ingreso() {
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
}
