import { UsuarioService } from '../../../service/usuario.service';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage implements OnInit {
  public usuario;
  public iniciales;
  constructor(public usuarioService:UsuarioService,public platform:Platform) { }

  ngOnInit() {
    let nombre =  localStorage.getItem("nombre");
    if(nombre && this.iniciales){
      this.usuario = nombre;
      
      return false;
    }
    this.usuarioService.obtener_mis_datos().then((data:any)=>{
        this.usuario = data.nombre;
        this.iniciales = data.nombre_completo
        .split(' ')
        .map( it => it.charAt(0) )
        .slice(0,1)
        .join('')
        +data.nombre_completo
        .split(' ')
        .map( it => it.charAt(0) )
        .slice(2,3)
        .join('');
        console.log("aca");
        localStorage.setItem("nombre",this.usuario);
        localStorage.setItem("iniciales",this.iniciales);
        console.log(this.usuario);
    });
    if(this.platform.is("cordova") && (!this.platform.is("android") && !this.platform.is("ios"))){
        alert("web");
    }
  }
  
}
