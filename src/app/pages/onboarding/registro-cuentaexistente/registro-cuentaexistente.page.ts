import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private navCtrl : NavController,public route: ActivatedRoute) { }

  ngOnInit() {
    this.pfpj = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).pfpj;
    this.error = (JSON.parse(this.route.snapshot.queryParamMap.get("param"))).error?(JSON.parse(this.route.snapshot.queryParamMap.get("param"))).error:false;
  }
  
  Si(){
    Onboarding_vars.add({terminos_acepta:true});
    if(this.pfpj=="pj"){
      let validaciones = JSON.parse(localStorage.getItem("validaciones"));
      this.despachar(validaciones.mail) || this.despachar(validaciones.cel) || this.despachar(validaciones.ident,"validaridentidad");
    }
    else{
      this.navCtrl.navigateForward(["registro-cuentaexistente-si",{}]);  
    }
  }
  despachar(valid,pagina?){
    return valid? pagina!=undefined?this.navCtrl.navigateForward(pagina) :this.navCtrl.navigateForward("registro1"):false;
  }
  No(){
    this.navCtrl.navigateForward(["registro-cuentaexistente-no",{}]);
  }

}
