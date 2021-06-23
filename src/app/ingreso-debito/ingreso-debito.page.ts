import { Persona, Ipersona } from '../models/persona';
import { Deuda } from '../models/deuda';
import { UsuarioService } from '../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-ingreso-debito',
  templateUrl: './ingreso-debito.page.html',
  styleUrls: ['./ingreso-debito.page.scss'],
})
export class IngresoDebitoPage implements OnInit {
  public monto;
  public pedidook="1";
  public persona;
  public mensaje;
  public cargando;
  public log;
  constructor(public usuarios:UsuarioService,private navCtrl: NavController) { }

  ngOnInit() {
    this.usuarios.obtener_mis_datos().then((data:Ipersona)=>{

      console.log(data);
      this.persona=data;
       let iniciales = localStorage.getItem("iniciales");
      this.cargando=false;
    });
  }
  ingresar(monto,event){
    this.monto = monto;
    let elements  = document.querySelectorAll("div.monto");
    elements.forEach(element => {
        element.classList.remove("activo-texto");
    });
    console.log(event.srcElement.classList.add("activo-texto"));
  }
  SeleccionaTarjeta(){
    if(!this.monto){
      return false;
    }
    const persona:Persona={id:this.persona.id,nombre:this.persona.nombre_completo,iniciales:this.persona.iniciales};
    const deuda:Deuda={monto:this.monto,mensaje:"Recarga cuenta",id:null,tipo_deuda:"Recargatd"};
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({persona:persona,deuda:deuda,sinCuenta:true,soloDebito:true,url:""})
      }
    };
    this.navCtrl.navigateRoot("pagar",navigationExtras);
    // this.navCtrl.navigateForward(["ingreso-debito2",{}]);
  }
}
