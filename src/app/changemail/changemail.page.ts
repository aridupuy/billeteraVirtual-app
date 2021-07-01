import { RegistroService } from '../service/registro.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changemail',
  templateUrl: './changemail.page.html',
  styleUrls: ['./changemail.page.scss'],
})
export class ChangemailPage implements OnInit {
public mail;
public errorMail=false;
constructor(private navCtrl : NavController,private route:ActivatedRoute,public register:RegistroService) {}
  ngOnInit() {
  }

  Continuar(){
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.register.cambiar_mail(p.id_usuario,this.mail).then(data=>{
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({mail:true})
        }
      }
      this.navCtrl.navigateForward("lostpassword-exito",navigationExtras);
    }).catch(err=>{
      
      
    });
    
  }
    
}
