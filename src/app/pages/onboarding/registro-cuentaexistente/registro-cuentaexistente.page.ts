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
  constructor(private navCtrl : NavController,public route: ActivatedRoute) { }

  ngOnInit() {
    this.pfpj = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).pfpj;
    this.usuario=(JSON.parse(this.route.snapshot.queryParamMap.get("param"))).usuario;
    this.error = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).error?(JSON.parse(this.route.snapshot.queryParamMap.get("param"))).error:false;
  }
  
  Si(){
    Onboarding_vars.add({terminos_acepta:true});
    if(this.pfpj=="pj"){
      let validaciones = JSON.parse(localStorage.getItem("validaciones"));
      this.despachar(validaciones.mail) || this.despachar(validaciones.cel) || this.despachar(validaciones.ident,"validaridentidad");
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
  despachar(valid,pagina?){
    return valid? pagina!=undefined?this.navCtrl.navigateForward(pagina) :this.navCtrl.navigateForward("registro1"):false;
  }
  No(){
    this.navCtrl.navigateForward(["registro-cuentaexistente-no",{}]);
  }

}
