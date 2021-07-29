import { Libs } from '../../classes/libs';
import { Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
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
  public p;
  constructor(public libs:Libs,public route:ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    
  }

  finalizar(){
    this.navCtrl.navigateForward(this.goto);

  }
  compartirComprobante(){
    console.log(this);
  }
  inciales(){
     return this.libs.iniciales(this.nombre+" "+this.apellido);
  }
  is_array(valor){
    return Array.isArray(valor);
  }
}

