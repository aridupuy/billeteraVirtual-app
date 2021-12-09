import { Observable } from '../../classes/observable';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorPage } from '../../error/error.page';
import { SuccessPage } from '../../success/success.page';
import { Exception } from '@zxing/library';




@Component({
  selector: 'app-respuesta-resultado',
  templateUrl: './respuesta-resultado.component.html',
  styleUrls: ['./respuesta-resultado.component.scss'],
})
export class RespuestaResultadoComponent implements OnInit {

  @Input() mensaje;
  @Input() descripcion;
  @Input() static pedidook;
  @Input() url;
  public dato;
  public monto;
  public persona;
  public deuda;

  constructor(public route: ActivatedRoute, public router: Router, public navCtrl: NavController) {
    console.log("EN CONTRUCTOR");
    console.log(this);
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p != null) {
      if (p.mensaje != null)
        this.mensaje = p.mensaje;
      if (p.descripcion != null)
        this.descripcion = p.mensaje;
      if (p.pedidook != null)
        RespuestaResultadoComponent.pedidook = p.pedidook;
      if (p.persona != null)
        this.persona = p.persona; 
      if (p.deuda != null)
        this.deuda = p.deuda; 
    }
    console.log(this);

  }

  ngOnInit() {
    
    console.log(RespuestaResultadoComponent.pedidook);
    console.log(this.descripcion);
    console.log(this.mensaje);
    console.log(this.url);
  }
  ionViewDidEnter(){
    console.log(this);
  }
  volver() {
    
    console.log(this.url);
    this.navCtrl.navigateRoot(this.url);
  }
  static reintentar() {
    try{
    RespuestaResultadoComponent.pedidook = 0;
    Observable.notify("change", RespuestaResultadoComponent.pedidook);
    }catch(e){
      console.log(e);
    }
  }
  public static getStatus() {
    
    return RespuestaResultadoComponent.pedidook;
  }
  public static setStatus(pedidook) {
    
    console.log(pedidook);
    RespuestaResultadoComponent.pedidook = pedidook;
  }
  public getStatusInternal() {
    
    return RespuestaResultadoComponent.pedidook;
  }
  public setStatusInternal(pedidook) {
    
    RespuestaResultadoComponent.pedidook = pedidook;
    console.log(this);
  }
}
