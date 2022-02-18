import { ContactoService } from '../../../service/contacto.service';
import { Libs } from '../../../classes/libs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo-desdelista',
  templateUrl: './pedir-amigo-desdelista.page.html',
  styleUrls: ['./pedir-amigo-desdelista.page.scss'],
})
export class PedirAmigoDesdelistaPage implements OnInit {

  constructor(public route: ActivatedRoute,public contacto:ContactoService,private navCtrl: NavController,public libs:Libs) { }
  public monto_escrito;
  public monto;
  public referencia;
  public ultimos;
  // public busqueda;
  // public resultados;
  public buscando=false;
  public sinResutados=false
  public amigos ;
  public enviar;
  public pedir;
  ngOnInit() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p.var);
    this.amigos = p.var;
    if('envio' in p){
      console.log("aca");
      this.enviar=p.envio;
    }
    if('pedir' in p){
      console.log("aca2");
      this.pedir = p.pedir;
    }    
    if(!this.pedir && !this.enviar){
      console.log("aca3");
      this.pedir=true;
      this.enviar=false;
    }
    console.log(this.pedir);

  }
  

  Continuar() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ monto:this.monto_escrito,amigos: this.amigos,referencia:this.referencia,envio:this.enviar,pedir:this.pedir})
      }
    };
    this.navCtrl.navigateForward("pedir-amigo-desdelista2",navigationExtras);
  }
  Modificar() {
    this.navCtrl.navigateBack(["lista-amigos",{}]);
  }
}
