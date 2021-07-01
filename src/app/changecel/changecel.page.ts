import { RegistroService } from '../service/registro.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changecel',
  templateUrl: './changecel.page.html',
  styleUrls: ['./changecel.page.scss'],
})
export class ChangecelPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye-outline';
  public errorCel;
  public cargando = true;
  public celular;
  public codArea;
  

  constructor(private navCtrl : NavController,private route:ActivatedRoute,public register:RegistroService) {}

  ngOnInit() {
  }

  Continuar(){
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.register.cambiar_cel(p.id_usuario,this.codArea,this.celular).then(data=>{
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({tel:true})
        }
      }
      this.navCtrl.navigateForward("lostpassword-exito",navigationExtras);
    }).catch(err=>{
      
      
    });
    
  }
  validar_celular(){
    
    let result = (""+this.codArea+this.celular).match(/^[+]?[0-9]{2}([0-9]{2}[0-9]{8})$/);
    if(result!==null){
        this.errorCel=false;
    }
    else{
      this.errorCel=true;
    }
    }
  

}
