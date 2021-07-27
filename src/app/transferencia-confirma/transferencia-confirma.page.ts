import { Libs } from '../classes/libs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transferencia-confirma',
  templateUrl: './transferencia-confirma.page.html',
  styleUrls: ['./transferencia-confirma.page.scss'],
})
export class TransferenciaConfirmaPage implements OnInit {
  public destinatario;
  public monto;
  public motivo;
  public mensaje;
  public cargando;
  public p;
  constructor(public route: ActivatedRoute,private navCtrl: NavController,public libs:Libs) { }

  ngOnInit() {
    this.p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.destinatario = this.p.destinatario;
    this.monto = this.p.monto;
    this.mensaje = this.p.mensaje;
    this.motivo= this.p.motivo;
    // this.cargando=true;
  }
  Continuar() {
    let dato ;
    console.log(this.destinatario);
    if(this.destinatario.cbu!=null && this.destinatario.cbu!='')
      dato  = "CBU "+this.destinatario.cbu;
    if(this.destinatario.cvu!=null && this.destinatario.cvu!='')
      dato  = "CVU "+this.destinatario.cvu;
    if(this.destinatario.alias!=null && this.destinatario.alias!='')
      dato  = "ALIAS "+this.destinatario.alias;
      let envio  = true;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({envio:envio,monto:this.monto,motivo:this.motivo,nombre:this.destinatario.nombre,apellido:this.destinatario.apellido,dato:dato})
      }
    };
    /* sale bien*/
    // this.navCtrl.navigateForward("success",navigationExtras);
    /* sale mal*/
      this.navCtrl.navigateForward("error",navigationExtras);
  }
  editarDestinatario(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(this.p)
      }
    };
    this.navCtrl.navigateBack("retiro-transferencia",navigationExtras)

  }
  editarCampos() {
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(this.p)
      }
    };
    this.navCtrl.navigateBack("transferencia-monto",navigationExtras);
  }
  inciales(){
    return this.libs.iniciales(this.destinatario.nombre+" "+this.destinatario.apellido);
  }
}
