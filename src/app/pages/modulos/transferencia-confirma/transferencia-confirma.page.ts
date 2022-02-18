import { Libs } from '../../../classes/libs';
import { TransferirProveedorService } from '../../../service/transferir-proveedor.service';
import { Router } from '@angular/router';
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
  constructor(public route: ActivatedRoute,public router:Router,private navCtrl: NavController,public libs:Libs,public Transferencia:TransferirProveedorService) { }

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
    
    
    
    this.Transferencia.transferir_proveedor(this.destinatario.id_destinatario,this.monto,this.mensaje,this.motivo,this.destinatario.email).then(data=>{
      /* sale bien*/
      console.log(data);
      this.navCtrl.navigateForward("success",navigationExtras);
    }).catch(err=>{
      /* sale mal*/
      console.log(err);
      console.log(this.router.url);
      let url = "transferencia-confirma";
      let navigationExtrasError: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({envio:envio,monto:this.monto,motivo:this.motivo,nombre:this.destinatario.nombre,apellido:this.destinatario.apellido,dato:dato,mensaje:err,url:url,goto:url})
        }
      }
      this.navCtrl.navigateForward("error",navigationExtrasError);
    });
    
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
