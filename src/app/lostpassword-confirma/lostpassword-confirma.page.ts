import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lostpassword-confirma',
  templateUrl: './lostpassword-confirma.page.html',
  styleUrls: ['./lostpassword-confirma.page.scss'],
})
export class LostpasswordConfirmaPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye-outline';

  togglePassword():void {
    this.showPassword =! this.showPassword;
    if (this.showPassword == true)
      this.passwordToggleIcon = 'eye-off-outline';
    else
      this.passwordToggleIcon = 'eye-outline';
  }

  constructor(private navCtrl : NavController) {}

  ngOnInit() {
  }

  Continuar(){
    this.navCtrl.navigateForward(["lostpassword-exito",{}]);
  }

}
