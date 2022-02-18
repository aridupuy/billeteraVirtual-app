import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PermisoService } from 'src/app/service/permiso.service';

@Component({
  selector: 'app-retirar-dinero',
  templateUrl: './retirar-dinero.page.html',
  styleUrls: ['./retirar-dinero.page.scss'],
})
export class RetirarDineroPage implements OnInit {

  puedetranfs;
  puede_enviar;
  puede_efectivo;
  constructor(private navCtrl: NavController,public permisoService:PermisoService) { }

  ngOnInit() {
    this.permisoService.puede("retiro-transferencia").then(data=>{
      this.puedetranfs=true;
    }).catch(data=>{
      this.puedetranfs=false;
    })

    this.permisoService.puede("enviar-amigo").then(data=>{
      this.puede_enviar=true;
    }).catch(data=>{
      this.puede_enviar=false;
    })

    this.permisoService.puede("retiro-efectivo").then(data=>{
      this.puede_efectivo=true;
    }).catch(data=>{
      this.puede_efectivo=false;
    })

  }
  transferencia() {
    this.navCtrl.navigateForward("retiro-transferencia");
  }
  efectivo() {
    this.navCtrl.navigateForward("retiro-efectivo");
  }
  enviardinero() {
    this.navCtrl.navigateForward("enviar-amigo");
  }
}
