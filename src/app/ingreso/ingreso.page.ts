import { LoginService, Ilogin } from '../service/login.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye-outline';
  private todo: FormGroup;
  public error=false;
  public usuario;
  public password;
  public noLogin = false;
  public cargando = false
  public error_user=false;
  public error_pass=false;


  constructor(public log_in: LoginService, public route: ActivatedRoute,public router : Router,
    private formBuilder: FormBuilder, public HttpClient: HttpClient,public navCtrl:NavController) {
    this.todo = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: [''],
    });
  }
  login(){
    this.noLogin=true;
  }
  ionViewWillLeave(){
    this.cargando = false;
  }
  togglePassword():void {
    this.showPassword =! this.showPassword;
    if (this.showPassword == true)
      this.passwordToggleIcon = 'eye-off-outline';
    else
      this.passwordToggleIcon = 'eye-outline';
  }
  

  async ngOnInit() {
    await this.log_in.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(data=>{
      this.cargando = false;
      this.error_user=false;
      this.error_pass=false;
      this.router.navigateByUrl("home");
    }).catch(data=>{
      localStorage.removeItem("token");
      return false
    });
    
  }
  async Ingresar(){
      this.error=false;
        /*this.navCtrl.navigateForward(["identidad-foto-alternativa",{}]);*/
        this.cargando = true
       await this.log_in.login(this.usuario, this.password).then((data:Ilogin)=>{
            this.cargando = false;
            this.error_user=false;
           this.error_pass=false;
            this.navCtrl.navigateForward(["home",{}]);
        }).catch(err=>{
          this.cargando = false;
          this.error=true;
          this.error_pass=true;
          this.error_user=true;
        });
    
  }
  
  LostPassword(){
    this.navCtrl.navigateForward(["lostpassword",{}]);
  }
}
