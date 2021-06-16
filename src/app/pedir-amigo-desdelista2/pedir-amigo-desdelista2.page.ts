import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo-desdelista2',
  templateUrl: './pedir-amigo-desdelista2.page.html',
  styleUrls: ['./pedir-amigo-desdelista2.page.scss'],
})
export class PedirAmigoDesdelista2Page implements OnInit {
  public monto;
  public referencia;
  public amigos;
  constructor(public route: ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    this.monto = p.monto;
    this.amigos  = p.amigos;
    this.referencia = p.referencia;
  }
  Continuar() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      }
    };
    this.navCtrl.navigateForward("pago",navigationExtras);
  }
  Modificar() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      }
    };
    this.navCtrl.navigateBack("pedir-amigo-desdelista2",navigationExtras);
  }
  FinalizarLink(){

  }
}
