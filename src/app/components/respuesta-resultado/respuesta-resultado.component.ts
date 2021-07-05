import { Observable } from './../../classes/observable';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Inject } from '@angular/core';



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
  constructor(public route: ActivatedRoute, public router: Router, public navCtrl: NavController) {
    // console.log("EN CONTRUCTOR");
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p != null) {
      if (p.mensaje != null)
        this.mensaje = p.mensaje;
      if (p.descripcion != null)
        this.descripcion = p.mensaje;
      if (p.pedidook != null)
        RespuestaResultadoComponent.pedidook = p.pedidook;
    }


  }

  ngOnInit() {
    
    // console.log(RespuestaResultadoComponent.pedidook);
    // console.log(this.descripcion);
    // console.log(this.mensaje);
    // console.log(this.url);
  }
  volver() {
    
    // console.log(this.url);
    this.navCtrl.navigateRoot(this.url);
  }
  reintentar() {
    
    RespuestaResultadoComponent.pedidook = 0;
    Observable.notify("change", RespuestaResultadoComponent.pedidook);
  }
  public static getStatus() {
    
    return RespuestaResultadoComponent.pedidook;
  }
  public static setStatus(pedidook) {
    
    // console.log(pedidook);
    RespuestaResultadoComponent.pedidook = pedidook;
  }
  public getStatusInternal() {
    
    return RespuestaResultadoComponent.pedidook;
  }
  public setStatusInternal(pedidook) {
    
    RespuestaResultadoComponent.pedidook = pedidook;
  }
}
