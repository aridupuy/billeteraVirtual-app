import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ingresar-efectivo-monto',
  templateUrl: './ingresar-efectivo-monto.page.html',
  styleUrls: ['./ingresar-efectivo-monto.page.scss'],
})
export class IngresarEfectivoMontoPage implements OnInit {

  constructor(public navCtrl:NavController) { }
  public monto;
  ngOnInit() {
  }
  ingresar(monto,event){
    this.monto = monto;
    let elements  = document.querySelectorAll("div.monto");
    elements.forEach(element => {
        element.classList.remove("activo-texto");
    });
    console.log(event.srcElement.classList.add("activo-texto"));
  }
  Continuar(){
    if(!this.monto){
      return false;
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({monto:this.monto})
      }
    };
    this.navCtrl.navigateRoot("ingreso-efectivo",navigationExtras);
  }
}
