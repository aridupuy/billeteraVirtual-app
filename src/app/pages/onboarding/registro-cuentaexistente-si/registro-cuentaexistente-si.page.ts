import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-cuentaexistente-si',
  templateUrl: './registro-cuentaexistente-si.page.html',
  styleUrls: ['./registro-cuentaexistente-si.page.scss'],
})
export class RegistroCuentaexistenteSiPage implements OnInit {

  protected usuario;
  constructor(private navCtrl : NavController,public route: ActivatedRoute) { }

  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.usuario=p.usuario;
  }
  LostPassword(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ usuario:this.usuario })
      }
    };
    this.navCtrl.navigateForward("lostpassword",navigationExtras);
  }
  Ingreso(){
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
  Reintentar(){
    this.navCtrl.navigateForward(["registro",{}]);
  }
}
