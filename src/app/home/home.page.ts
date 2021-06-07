import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { formatCurrency } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Icon Cambia Saldo
  mostrarSaldo = true;
  ToggleIcon = 'eye-outline';
  
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
  public saldoUsuario = formatCurrency(parseFloat('1521.8'), 'en-US', '$', 'ARS', '4.2-2')

  constructor(private menu: MenuController) {}
  abreMenu() {
    this.menu.enable(true, 'menuPrincipal');
    this.menu.open('menuPrincipal');
  }
}
