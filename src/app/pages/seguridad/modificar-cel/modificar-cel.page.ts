import { Libs } from '../../../classes/libs';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-cel',
  templateUrl: './modificar-cel.page.html',
  styleUrls: ['./modificar-cel.page.scss'],
})
export class ModificarCelPage implements OnInit {
  @ViewChild("cod_pais") cod_pais: ElementRef;

  public codArea;
  public celular;
  public errorCel;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  Confirma(){
    console.log(this.cod_pais.nativeElement.value);
    Onboarding_vars.add({celular:this.celular,cod_area:this.codArea,cod_pais:this.obtener_codigo_pais()})
    return this.navCtrl.navigateForward("confirmasms");
  }
  obtener_codigo_pais() {
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
}
