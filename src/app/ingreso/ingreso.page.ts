import { LoginService, Ilogin } from '../service/login.service';
import { Observable } from '../classes/observable';
import { Platform } from '@ionic/angular';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
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
  public web=false;

  constructor(public log_in: LoginService, public route: ActivatedRoute,public router : Router,
    private formBuilder: FormBuilder, public HttpClient: HttpClient,public navCtrl:NavController,public platform :Platform) {
    this.todo = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: [''],
    });
    Observable.notify("SlashHide",false);
    console.log(this.platform.is("desktop"));
    console.log(this.platform.is("android"));
    console.log(this.platform.is("ios"));
    if(this.platform.is("desktop") && !this.platform.is("android") && !this.platform.is("ios")){
        
      this.web=true;
    }
    
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
    // await this.log_in.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(data=>{
    //   this.cargando = false;
    //   this.error_user=false;
    //   this.error_pass=false;
    //   this.router.navigateByUrl("home");
    // }).catch(data=>{
    //   localStorage.removeItem("token");
    //   return false
    // });
    
  }
  async Ingresar(){
      this.error=false;
        /*this.navCtrl.navigateForward(["identidad-foto-alternativa",{}]);*/
        this.cargando = true
       await this.log_in.login(this.usuario, this.password).then((data:Ilogin)=>{
            this.cargando = false;
            this.error_user=false;
           this.error_pass=false;
           console.log("logeado voy aca");
          localStorage.removeItem("onboarding");
          localStorage.setItem("fromlastLogin","1");
          this.navCtrl.navigateForward(["home-first",{}]);
        }).catch(err=>{
          this.cargando = false;
          this.error=true;
          this.error_pass=true;
          this.error_user=true;
        });
    
  }
  
  LostPassword(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({usuario:this.usuario, logued:false})
      }
    }
    if(this.platform.is("desktop") && !this.platform.is("android") && !this.platform.is("ios")){
      this.navCtrl.navigateForward("lostpassword-web",navigationExtras);
    }
    else
      this.navCtrl.navigateForward("lostpassword",navigationExtras);
  }
}
