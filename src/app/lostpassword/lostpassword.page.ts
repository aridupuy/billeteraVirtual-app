import { register } from 'ts-node';
import { RegistroService } from '../service/registro.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
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
  usuario :string;
  logued : boolean;
  telefono :string;
  selectmail :boolean= false;
  selectTel :boolean= false;

  SeleccionadoMail() {
    const selectorMail = document.querySelector("#mail")
    selectorMail.classList.toggle("activo")
    if (selectorMail.classList.contains("activo")) {
      this.ToggleIconMail = 'checkmark-outline';
      this.selectmail = true;
    }
    else{
      this.selectmail = false;
      this.ToggleIconMail = 'mail-outline';
    }
  }
  SeleccionadoTel() {
    const selector = document.querySelector("#telefono")
    selector.classList.toggle("activo")
    if (selector.classList.contains("activo")) {
      this.selectTel = true;
      this.ToggleIconTel = 'checkmark-outline';
    }
    else{
      this.selectTel = false;
      this.ToggleIconTel = 'chatbox-ellipses-outline';
    }
    console.log("telefono",this.selectTel);
    console.log("mail",this.selectmail);
  }
  constructor(private navCtrl : NavController,public route: ActivatedRoute,public register:RegistroService) {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      this.usuario = p.usuario;
      this.logued = p.logued;
  }
  
  ngOnInit() {
    this.register.obtener_datos_usuario(this.usuario).then(data=>{
        this.telefono = data.telefono.substr(0,4)+"".padStart((data.telefono.length)-6,"*")+data.telefono.substr(data.telefono.length-2,data.telefono.length)
    })
  }
  public ofus;
  ofuscar(usuario){
    if(!usuario)
      return false;
    let usu:string = usuario.split("@");
    this.ofus = usu[0].substr(0,1)+"".padStart((usu[0].length)-2,"*")+usu[0].substr(usu[0].length-1,usu[0].length)+"@"+usu[1];
    return this.ofus;
  }
  EnviarCodigo(){
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({usuario:p.usuario, logued:p.logued,selectmail:this.selectmail,selectTel:this.selectTel,ofus:this.ofus,ofustel:this.telefono})
      }
    }
    this.navCtrl.navigateForward("lostpassword1",navigationExtras);
  }
}
