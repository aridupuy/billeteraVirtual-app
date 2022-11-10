import { RespuestaResultadoComponent } from '../respuesta-resultado/respuesta-resultado.component';
import { Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})

export class ErrorComponent implements OnInit {
  @Input() mensaje="Error de comunicacion";
  @Input() descripcion;
  @Input() static pedidook;
  @Input() url;  
  @Input() dato;
  @Input() nombre;
  @Input() apellido;
  @Input() monto;
  @Input() envio=false;
  @Input() pedido = false;
  @Input() goto="home";
  @Input() denegado="false";

  // public mensaje;
  public p;
  public reintent;
  constructor(public route:ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    // this.p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    // if(this.p.mensaje!=null && this.p.mensaje!='' && this.p.mensaje!=undefined ){
    //   this.mensaje = this.mensaje;
    // }
    // if(this.p.reintentar!=null && this.p.reintentar!='' && this.p.reintentar!=undefined ){
    //   this.reintent = this.p.reintentar;
    // }
    // if(!this.url)
    //   this.url = this.p.goto;
    // console.log(this);
  }
  finalizar(){
    this.navCtrl.navigateForward("home");

  }
  reintentar(){
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(this.p)
      }
    };
    this.navCtrl.navigateForward(this.url,navigationExtras);
    RespuestaResultadoComponent.reintentar();
  }
  otrocall(){
    
  }

}
