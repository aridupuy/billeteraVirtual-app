import { SoporteService } from '../../../service/soporte.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validaridentidad-problema',
  templateUrl: './validaridentidad-problema.page.html',
  styleUrls: ['./validaridentidad-problema.page.scss'],
})
export class ValidaridentidadProblemaPage implements OnInit {

  public mensaje;
  public check;
  constructor(private navCtrl : NavController,public enviarsoporte:SoporteService) { }


  ngOnInit() {
  }
  Continuar(){
    this.enviarsoporte.enviarsoporte(this.check+" | "+ this.mensaje,localStorage.getItem("onboardingLastPage"),localStorage.getItem("proceso_alta")).then(data=>{
      this.navCtrl.navigateForward(["validaridentidad-problema-confirm",{}]);
    });
  }

}
