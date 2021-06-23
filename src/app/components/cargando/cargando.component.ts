import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss'],
})
export class CargandoComponent implements OnInit {
  @Input() cargando;
  @Input() mensaje;
  constructor() { }

  ngOnInit() {
    console.log(this.mensaje);
  }

}
