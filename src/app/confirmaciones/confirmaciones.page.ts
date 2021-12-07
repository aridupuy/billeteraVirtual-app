import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmaciones',
  templateUrl: './confirmaciones.page.html',
  styleUrls: ['./confirmaciones.page.scss'],
})
export class ConfirmacionesPage implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router,public navCtl:NavController) { }
  public mensaje;
  public username;
  public iniciales;
  ngOnInit() {
    let nombre = localStorage.getItem("nombre");
    let iniciales = localStorage.getItem("iniciales");
    if (nombre && iniciales) {
      this.username = nombre;
      this.iniciales = iniciales;
      // return false;
    }
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.mensaje=p.mensaje;
  }
  volver(){
    this.navCtl.navigateForward("home");
  }

}
