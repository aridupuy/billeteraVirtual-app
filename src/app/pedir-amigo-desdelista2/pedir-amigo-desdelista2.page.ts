import { ContactoService } from '../service/contacto.service';
import { Icontacto } from '../interfaces/Icontacto';
import { IdataQr } from '../interfaces/IdataQr';
import { IRESTBarcode } from '../interfaces/Ibarcode';
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
  public cargando=false;
  public enviar;
  public pedir;
  constructor(public route: ActivatedRoute,public contacto:ContactoService,private navCtrl: NavController) { }

  ngOnInit() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    this.monto = p.monto;
    this.amigos  = p.amigos;
    this.referencia = p.referencia;
    if('envio' in p)
      this.enviar = p.envio;
    if('pedir' in p)
      this.pedir = p.pedir;
  }
  Continuar() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      }
    };
    new Promise((resolve,rejects)=>{
      if(this.pedir){
      this.amigos.forEach(async (amigo:Icontacto,index,array) => {
        // this.cargando=true;
        
        await this.contacto.crear_pedido(amigo.id,this.monto,this.referencia).then(data=>{
          console.log(data);
          if(index==array.length-1){
            resolve(amigo);
          }
        }).catch(err=>{
          console.log(err);
          rejects(err)
      });
      
      });
    }
    if(this.enviar){
      this.amigos.forEach(async (amigo:Icontacto,index,array) => {
        // this.cargando=true;
        
        await this.contacto.crear_envio(amigo.id,this.monto,this.referencia).then(data=>{
          console.log(data);
          if(index==array.length-1){
            resolve(data);
          }
        }).catch(err=>{
            rejects(err)
        });
        
      });
    }
    }).then((data:IRESTBarcode)=>{
      // this.cargando= false;
      this.success=true;
      this.error=false;
      this.goto = "amigos";
      this.url = "amigos";
      this.mensaje = data.log;
      this.nombre = this.amigos;
      
      // this.apellido = this.amigos.pop().apellido;
      // this.navCtrl.navigateForward("amigos");
      
    })
    .catch(err=>{
      console.log(err);
      this.goto = "amigos";
      this.url = "amigos";
      this.error=true;
      this.success=false;
      this.nombre = this.amigos.pop().nombre;
      this.apellido = this.amigos.pop().apellido;
      this.mensaje = err;
    } );

    
    
    
  }
  public goto;
  public url;
  public error;
  public success;
  public dato;
  public nombre;
  public apellido;
  public pedido;
  public mensaje;
  public motivo;
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
