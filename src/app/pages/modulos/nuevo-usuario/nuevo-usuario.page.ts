import { Libs } from '../../../classes/libs';
import { UssersService } from '../../../service/ussers.service';
import { Usuario } from '../../../models/usuario';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.page.html',
  styleUrls: ['./nuevo-usuario.page.scss'],
})
export class NuevoUsuarioPage implements OnInit {
  @ViewChild("cod_pais") cod_pais: ElementRef;

  errorCel;
  errorMail;
  pass_documento;
  longitud;
  error_documento;
  usuario:Usuario=new Usuario();

  constructor(public UssersService:UssersService,public navCtrl:NavController) { }

  ngOnInit() {
  }
  Continuar(){
    this.usuario.cod_pais=this.obtener_codigo_pais();
    this.UssersService.crear_usuario(this.usuario).then(data=>{
      // this.usuario=new Usuario();
      this.usuario.id=data["id_cuenta_usuario"];
      const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({usuario:this.usuario})
      }
    };
      this.navCtrl.navigateForward("usuarios-permiso",navigationExtras);
    }).catch(err=>{
      alert(err);
    })
  }
  obtener_codigo_pais() {
    return this.cod_pais.nativeElement.innerHTML.replace("+", "");
  }
  validar_telefono() {
    let libs = new Libs();
    if (libs.validar_celular(this.obtener_codigo_pais() , this.usuario.codArea , this.usuario.telefono)) {
      this.errorCel = false;
    }
    else {
      this.errorCel = true;
    }
  }
  valida_mail(){
    let libs = new Libs();
    if(libs.validar_mail(this.usuario.email)){
      this.errorMail=true;
    }
    else{
      this.errorMail=false;
    }
  }
  validar_documento(){
 // if (!this.documento.toString().match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
    console.log(this.usuario.tipodoc);
    let match = this.usuario.tipodoc == "DNI" ? /^[0-9]{8}$/ : /^[0-9]{11}$/;
    if (this.usuario.documento && !this.usuario.documento.toString().match(match)) {
      this.error_documento = true;
      this.pass_documento = false;
    } else {
      this.error_documento = false;
      this.pass_documento = true;
    }
  }

}
