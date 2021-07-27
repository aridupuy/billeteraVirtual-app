import { ObtenerDestinatariosService } from '../service/obtener-destinatarios.service';
import { Libs } from '../classes/libs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-retiro-transferencia',
  templateUrl: './retiro-transferencia.page.html',
  styleUrls: ['./retiro-transferencia.page.scss'],
})
export class RetiroTransferenciaPage implements OnInit {
  public listaDestinatarios=[];
  public p ;
  constructor(public route: ActivatedRoute,private NavCtrl: NavController,public destinatarionService:ObtenerDestinatariosService,public libs:Libs) {}

  ngOnInit() {
    this.p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    
    this.destinatarionService.obtener_destinatarios().then(data=>{
      this.listaDestinatarios.push(data[0]);
      console.log(data[0]);
    });
    
  }
  nuevacuenta() {
    this.NavCtrl.navigateForward("agregar-destinatario")
  }
  destinatarios() {
    
    this.NavCtrl.navigateForward("lista-destinatarios");
  }
  transferir(item){
    if(this.p.destinatario !=null){
      this.p.destinatario = item;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify(this.p)
        }
      };
     return  this.NavCtrl.navigateForward("transferencia-confirma",navigationExtras);
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({destinatario:item})
      }
    };
    
    this.NavCtrl.navigateForward("transferencia-monto",navigationExtras);
  }

}
