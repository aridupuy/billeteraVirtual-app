import { PermisoService } from '../../../service/permiso.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso-dinero',
  templateUrl: './ingreso-dinero.page.html',
  styleUrls: ['./ingreso-dinero.page.scss'],
})
export class IngresoDineroPage implements OnInit {
  puedetranfs;
  puedeefectivo;
  puedeepedir;
  puedeedebito;
  constructor(private navCtrl: NavController,public permisoService:PermisoService) { }

  ngOnInit() {
    this.permisoService.puede("ingreso-transferencia").then(data=>{
      this.puedetranfs=true;
    }).catch(data=>{
      this.puedetranfs=false;
    })
    this.permisoService.puede("ingresar-efectivo-monto").then(data=>{
      this.puedeefectivo=true;
    }).catch(data=>{
      this.puedeefectivo=false;
    })
    this.permisoService.puede("ingreso-debito").then(data=>{
      this.puedeedebito=true;
    }).catch(data=>{
      this.puedeedebito=false;
    })
    this.permisoService.puede("pedir-amigo").then(data=>{
      this.puedeepedir=true;
    }).catch(data=>{
      this.puedeepedir=false;
    })
  }
  transferencia() {
    this.navCtrl.navigateForward(["ingreso-transferencia",{}]);
  }
  efectivo() {
    this.navCtrl.navigateForward(["ingresar-efectivo-monto",{}]);
  }
  tarjetadebito() {
    this.navCtrl.navigateForward(["ingreso-debito",{}]);
  }
  pedirdinero() {
    this.navCtrl.navigateForward(["pedir-amigo",{}]);
  }
}
