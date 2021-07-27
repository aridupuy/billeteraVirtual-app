import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})

export class ErrorPage implements OnInit {
  public dato;
  public nombre;
  public apellido;
  public monto;
  public envio=false;
  public pedido = false;
  public goto="home";
  public p;
  constructor(public route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.monto = this.p.monto;
    this.nombre = this.p.nombre;
    this.apellido = this.p.apellido;
    this.envio = this.p.envio;
    this.pedido = this.p.pedido;
    this.dato = this.p.dato;
  }

}
