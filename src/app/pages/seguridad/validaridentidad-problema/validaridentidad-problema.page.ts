import { SoporteService } from '../../../service/soporte.service';
import { LoginBoService } from '../../../service/login-bo.service';
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
  public form = [
    { val: 'Tengo impedimentos de visión temporal o crónica', isChecked: false },
    { val: 'No puedo sostener de manera correcta el celular', isChecked: false },
    { val: 'Otra razón', isChecked: false }
  ];
  constructor(private navCtrl: NavController, public enviarsoporte: SoporteService,private loginbo:LoginBoService) { }


  ngOnInit() {
  }
  Continuar() {
    let reduce=this.form.filter((currentValue) => {
      if (currentValue.isChecked == true)
        return currentValue;
    }).reduce((previus,current)=>{
         console.log(previus);
         current.val=previus.val+"|"+current.val
         return current;
    })
    console.log(reduce);
    this.loginbo.login().then(token=>{
      this.enviarsoporte.enviarsoporte(reduce.val + " | " + this.mensaje, localStorage.getItem("onboardingLastPage"), localStorage.getItem("proceso_alta"),token).then(data => {
        console.log(data);
        this.navCtrl.navigateForward(["validaridentidad-problema-confirm", {}]);
      });
    })
    
  }
  validate_form() {
    return this.form.filter((currentValue) => {
      if (currentValue.isChecked == true)
        return currentValue;
    }).length > 0;
  }

}
