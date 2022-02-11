import { RegistroService } from '../../../service/registro.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lostpassword-confirma',
  templateUrl: './lostpassword-confirma.page.html',
  styleUrls: ['./lostpassword-confirma.page.scss'],
})
export class LostpasswordConfirmaPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye-outline';
  public error_password;
  public cargando = true;
  public pass_minim = false;
  public pass_has_upper = false;;
  public pass_has_number = false;;
  public pass_has_simbol = false;
  public password;
  public repassword;
  togglePassword():void {
    this.showPassword =! this.showPassword;
    if (this.showPassword == true)
      this.passwordToggleIcon = 'eye-off-outline';
    else
      this.passwordToggleIcon = 'eye-outline';
  }

  constructor(private navCtrl : NavController,private route:ActivatedRoute,public register:RegistroService) {}

  ngOnInit() {
  }

  Continuar(){
    if (this.password != this.repassword) {
      this.error_password = true;
    }

    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p.id_usuario,this.password);
    this.register.cambiar_pass(p.id_usuario,this.password).then(data=>{
      this.navCtrl.navigateForward("lostpassword-exito");
    }).catch(err=>{
      
    });
    
  }
  validar_regex() {
    this.pass_minim = false;
    this.pass_has_upper = false;;
    this.pass_has_number = false;;
    this.pass_has_simbol = false;
    if (this.password != null) {
      if (this.password.toString().length >= 6) {
        this.pass_minim = true;
      }
      if ((this.password.toString().match(/^.*(?=\d).*$/))) {
        this.pass_has_number = true;
      }
      if ((this.password.toString().match(/^.*(?=[A-Z]).*$/))) {
        this.pass_has_upper = true;
      }
    }
    // if ((this.password.toString().match(/^.*(?=[@$!%*#?&]).*$/))) {
    //   this.pass_has_simbol = true;
    // }
    if (this.pass_minim && this.pass_has_upper && this.pass_has_number /* && this.pass_has_simbol*/) {
      this.error_password = false;
    } else {
      this.error_password = true;
    }
  }
  validar_password() {
    if(this.password == undefined || this.password.toString()==""  )
      this.error_password = false;
    if (!(this.password.toString().match(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/))) {
      this.error_password = true;
    }
    if (this.password != this.repassword)
      this.error_password = true;
    else
      this.error_password = false;
  }
}
