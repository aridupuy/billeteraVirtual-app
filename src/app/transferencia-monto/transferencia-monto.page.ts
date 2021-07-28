import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transferencia-monto',
  templateUrl: './transferencia-monto.page.html',
  styleUrls: ['./transferencia-monto.page.scss'],
})
export class TransferenciaMontoPage implements OnInit {
  public email;
  public monto;
  public motivo;
  public mensaje;
  public destinatario;
  constructor(public route: ActivatedRoute,private navCtrl: NavController) { }

  ngOnInit() {
    
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if(p.monto!=null){
      this.monto=p.monto;
      this.mensaje=p.mensaje;
      this.motivo=p.motivo;
      this.destinatario = p.destinatario;
      this.email=p.destinatario.email;
    }else{
    console.log(p.destinatario.email);
    this.email=p.destinatario.email;
    this.destinatario =p.destinatario;
    }
    console.log(p);
    if('destinatario' in p){
      if(0 in p.destinatario){
        this.email=p.destinatario[0].email;
        this.destinatario =p.destinatario[0];
      }
      else{
        this.email=p.destinatario.email;
        this.destinatario =p.destinatario;
      }
    }
    
  }
  customActionSheetOptions: any = {
    
  };
  Continuar() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({destinatario:this.destinatario,monto:this.monto,motivo:this.motivo,mensaje:this.mensaje})
      }
    };
    this.navCtrl.navigateForward("transferencia-confirma",navigationExtras);
  }
}
