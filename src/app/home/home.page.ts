import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { formatCurrency } from '@angular/common';

// import { MovesDescripcionPage } from './../moves-descripcion/moves-descripcion.page';
import { SaldoService } from './../service/saldo.service';
import { TransaccionesService } from './../service/transacciones.service';
// import { Observable } from './../classes/observable';
import { ActivatedRoute, Router } from '@angular/router';
// import { LoginPage } from './../login/login.page';
// import { FilterPage } from './../filter/filter.page';
import { ModalController, NavController } from '@ionic/angular';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { Transacciones } from '../interfaces/transacciones';
// import { SaldoService } from '../service/saldo.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // Icon Cambia Saldo
  mostrarSaldo = true;
  ToggleIcon = 'eye-outline';
  public saldoUsuario ;
  constructor(private menu: MenuController,public saldoService:SaldoService,public transaccionesService:TransaccionesService) {}

  ngOnInit(): void {
    this.obtener_saldo();
    
   
  }
  async obtener_saldo(){
    await this.saldoService.obtener().then((data: number) => {
            this.saldoUsuario = formatCurrency(data, 'en-US', '$', 'ARS', '4.2-2');
        });
    // this.decimal = Math.trunc((this.saldo-Math.trunc(this.saldo))*100);
    // this.saldo = Math.trunc(this.saldo);
}
  toggleIcon():void {
    this.mostrarSaldo =! this.mostrarSaldo;
    let saldoUsuarioSelector = document.querySelector(".saldoUsuario") as HTMLElement;
    if (this.mostrarSaldo == true) {
      this.ToggleIcon = 'eye-off-outline';
      saldoUsuarioSelector.innerHTML= this.saldoUsuario;
    }
    else {
      this.ToggleIcon = 'eye-outline';
      saldoUsuarioSelector.innerHTML="******";
    }
  }

  // Formateador de Float a Currency
  // public saldoUsuario = 

  
  abreMenu() {
    this.menu.enable(true, 'menuPrincipal');
    this.menu.open('menuPrincipal');
  }
}
