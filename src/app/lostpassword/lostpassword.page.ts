import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.page.html',
  styleUrls: ['./lostpassword.page.scss'],
})
export class LostpasswordPage implements OnInit {
  ToggleIconMail = 'mail-outline';
  ToggleIconTel = 'chatbox-ellipses-outline';
  SeleccionadoMail() {
    const selectorMail = document.querySelector("#mail")
    selectorMail.classList.toggle("activo")
    if (selectorMail.classList.contains("activo")) 
      this.ToggleIconMail = 'checkmark-outline';
    else
      this.ToggleIconMail = 'mail-outline';
  }
  SeleccionadoTel() {
    const selector = document.querySelector("#telefono")
    selector.classList.toggle("activo")
    if (selector.classList.contains("activo")) 
      this.ToggleIconTel = 'checkmark-outline';
    else
      this.ToggleIconTel = 'chatbox-ellipses-outline';
  }
  constructor(private navCtrl : NavController) {}
  
  ngOnInit() {
  }
  EnviarCodigo(){
    this.navCtrl.navigateForward(["lostpassword1",{}]);
  }
}
