import { EmailContactoService } from '../service/email-contacto.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginBoService } from '../service/login-bo.service';

@Component({
  selector: 'app-registro-cuentaexistente-ayuda',
  templateUrl: './registro-cuentaexistente-ayuda.page.html',
  styleUrls: ['./registro-cuentaexistente-ayuda.page.scss'],
})
export class RegistroCuentaexistenteAyudaPage implements OnInit {
  public email;
  public nombre;
  public mensaje;
  public error_mail;
  public cargando=false;
  constructor(private navCtrl : NavController,public soporte:EmailContactoService,public bo:LoginBoService) { }

  ngOnInit() {
  }
  Confirmar(){
    this.cargando = true;
    this.bo.login().then((token)=>{
      console.log(token);
      this.soporte.enviar_mail_soporte(this.email,this.nombre,this.mensaje,token).then(()=>{
        this.navCtrl.navigateForward(["registro-cuentaexistente-ayuda-confirm",{}]);  
        this.cargando = false;
      })
      
    })
    
  }
  
  valida_mail(){
    console.log(this.email);
    
    if (!this.email.toString().match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
      this.error_mail = true;
    } else {
      this.error_mail = false;
    }

  }
}
