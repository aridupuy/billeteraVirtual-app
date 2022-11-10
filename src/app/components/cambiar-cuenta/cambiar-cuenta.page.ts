import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-cuenta',
  templateUrl: './cambiar-cuenta.page.html',
  styleUrls: ['./cambiar-cuenta.page.scss'],
})
export class CambiarCuentaPage implements OnInit {

  constructor(public modalCtrl:ModalController,public router:Router,public NavCtrl:NavController) { }
  
  public cuentas:any[];
  async ngOnInit() {
    this.cuentas = await JSON.parse(localStorage.getItem("cuentas"));
    this.cuentas.forEach((cuenta)=>{
      console.log(cuenta);
    })
    //this.cuentas=[{iniciales:"1",dato:"dato1"},{iniciales:"3",dato:"dato2"},{iniciales:"2",dato:"dato3"}]
  }
  cambiar(cuenta){
    console.log(cuenta);
    localStorage.setItem("token",cuenta.token);
    localStorage.setItem("nombreEmpresa",cuenta.titular[0]);
    localStorage.setItem("inicialesEmpresa",cuenta.iniciales);
    this.modalCtrl.dismiss();
    
    this.NavCtrl.navigateRoot("home");
    
  }
  get_iniciales(cuenta){
    return cuenta.iniciales;
  }
  get_dato(cuenta){
    return cuenta.dato;
  }
  get_titular(cuenta){
    return cuenta.titular.toString().replaceAll(","," ");
  }
}
