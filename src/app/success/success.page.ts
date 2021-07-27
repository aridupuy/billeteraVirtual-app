import { Libs } from '../classes/libs';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-page',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  public dato;
  public nombre;
  public apellido;
  public monto;
  public envio=false;
  public pedido = false;
  public goto="home";
  public p;
  constructor(public libs:Libs,public route:ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    this.p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.monto = this.p.monto;
    this.nombre = this.p.nombre;
    this.apellido = this.p.apellido;
    this.envio = this.p.envio;
    this.pedido = this.p.pedido;
    this.dato = this.p.dato;
  }

  finalizar(){
    this.navCtrl.navigateForward(this.goto);

  }
  compartirComprobante(){

  }
  inciales(){
     return this.libs.iniciales(this.nombre+" "+this.apellido);
  }

}
