import { LostpasswordConfirmaPage } from '../lostpassword-confirma/lostpassword-confirma.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lostpasswordconfirma-web',
  templateUrl: './lostpasswordconfirma-web.page.html',
  styleUrls: ['./lostpasswordconfirma-web.page.scss'],
})
export class LostpasswordconfirmaWebPage extends LostpasswordConfirmaPage {

  Continuar(){
    if (this.password != this.repassword) {
      this.error_password = true;
    }

    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p.id_usuario,this.password);
    this.register.cambiar_pass(p.id_usuario,this.password).then(data=>{
      this.navCtrl.navigateForward("lostpasswordexito-web");
    }).catch(err=>{
      
    });
    
  }

}
