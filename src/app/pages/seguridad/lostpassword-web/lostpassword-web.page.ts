import { LostpasswordPage } from '../lostpassword/lostpassword.page';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lostpassword-web',
  templateUrl: './lostpassword-web.page.html',
  styleUrls: ['./lostpassword-web.page.scss'],
})
export class LostpasswordWebPage extends LostpasswordPage{
  public selectmail;
  EnviarCodigo() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({usuario:this.usuario.toLowerCase(), email: this.mail, logued: p.logued, selectmail: this.selectmail, 
          selectTel: this.selectTel, ofus: this.ofus, 
          cel: this.celular,ofustel:this.ofuscar_cel(this.celular) })
      }
    }
    this.navCtrl.navigateForward("lostpassword1-web", navigationExtras);
  }  
}
