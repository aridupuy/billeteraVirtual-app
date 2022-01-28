import { Datospersonales2Page as DP2} from '../../persona/09-datospersonales2/datospersonales2.page';
import { Onboarding_vars } from '../../../../classes/onboarding-vars';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-datospersonales-empresa1',
  templateUrl: './datospersonales-empresa1.page.html',
  styleUrls: ['./datospersonales-empresa1.page.scss'],
})
export class DatospersonalesEmpresa1Page extends DP2 {
  condatos=false;
  modificar=true;
  ngOnInit() {
    localStorage.setItem("onboardingLastPage","empresa/datospersonales-empresa1");
    let p = Onboarding_vars.get();
    console.log(p);
    if(this.calle && this.altura){
      this.condatos = true;
      this.modificar=false;
    }
    this.provincia_sel=!this.provincia;
    this.ciudad_sel=!this.ciudad;
    this.obtener_provincias(p.nacionalidad);
  }
  Continuar() {
    let  p  = Onboarding_vars.get();
    // localStorage.setItem("varsOnboarding",JSON.stringify(p));

    // console.log(p);
    // let calle=this.calle_mod!==undefined?this.calle_mod:this.calle;
    // let altura=this.altura_mod!==undefined?this.altura_mod:this.altura;
    // let depto=this.depto_mod!==undefined?this.depto_mod:this.depto;
    // let piso=this.piso_mod!==undefined?this.piso_mod:this.piso;
    
    // Onboarding_vars.add({direccion:calle,numero:altura,depto:depto,piso:piso,cod_postal:this.cod_postal});
    // p  = Onboarding_vars.get();
    let vars ={
      calle_empresa:this.calle_mod,
      altura_empresa:this.altura_mod,
      depto_empresa:this.depto_mod,
      piso_empresa:this.piso_mod,
      ciudad_empresa:this.ciudad,
      provincia_empresa:this.provincia,
      cod_postal_empresa:this.cod_postal
    }
    console.log(vars);
    Onboarding_vars.add(vars);
    this.navCtrl.navigateForward("empresa/datospersonales1");

  }
}
