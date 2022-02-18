import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cuentaexistente',
  templateUrl: './registro-cuentaexistente.page.html',
  styleUrls: ['./registro-cuentaexistente.page.scss'],
})
export class RegistroCuentaexistentePage implements OnInit {

  private pfpj;
  public error;
  protected usuario;
  public tipo;
  constructor(private navCtrl : NavController,public route: ActivatedRoute) { }

  ngOnInit() {
    this.pfpj = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).pfpj;
    this.tipo = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).tipo;
    this.usuario=(JSON.parse(this.route.snapshot.queryParamMap.get("param"))).usuario;
    this.error = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).error?(JSON.parse(this.route.snapshot.queryParamMap.get("param"))).error:false;
  }
  
  Si(){
    
    if(this.pfpj=="pj"){
      // let validaciones = JSON.parse(localStorage.getItem("validaciones"));
      // this.despachar(validaciones.mail) || this.despachar(validaciones.cel) || this.despachar(validaciones.ident,"validaridentidad");
      Onboarding_vars.add({usuario:this.usuario});
      this.navCtrl.navigateForward("confirmapaswword");  
    }
    else{
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({ pfpj: this.pfpj,usuario:this.usuario })
        }
      };
      this.navCtrl.navigateForward("registro-cuentaexistente-si",navigationExtras);  
    }
  }
 
  No(){
    this.navCtrl.navigateForward(["registro-cuentaexistente-no",{}]);
  }

}
