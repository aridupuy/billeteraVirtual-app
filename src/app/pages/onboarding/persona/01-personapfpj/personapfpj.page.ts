import { InicioProcesoService } from '../../../../service/inicio-proceso.service';
import { Onboarding_vars } from '../../../../classes/onboarding-vars';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-personapfpj',
  templateUrl: './personapfpj.page.html',
  styleUrls: ['./personapfpj.page.scss'],
})
export class PersonapfpjPage implements OnInit {
  params;
  constructor(public screenOrientation:ScreenOrientation,public route: ActivatedRoute, public router: Router,private navCtrl : NavController,private renderer: Renderer2) { 

    if (localStorage.getItem("onboarding") != "1") {
      localStorage.setItem("onboarding", "1");
    }
  }

  async ngOnInit() {
    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then();

    this.params  = Onboarding_vars.get();
    console.log(this.params);
    /*con este codigo se puede hacer persistente la ultima accion del usuario */
    // let pagina = localStorage.getItem("onboardingLastPage");
    // if(pagina!=null)
    //   this.navCtrl.navigateForward(pagina);
  }
  validar(pfpj){
    Onboarding_vars.add({"pfpj":pfpj})
    console.log(pfpj);
    if(pfpj=="pf"){
      console.log("aca1"); 
      this.navCtrl.navigateForward("valida-dni");
    }
    else{
      console.log("aca");
      this.navCtrl.navigateForward("empresa/valida-dni");
    }
  }
  Ingreso() {
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
}
