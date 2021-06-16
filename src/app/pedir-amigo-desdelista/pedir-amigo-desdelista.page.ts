import { ContactoService } from '../service/contacto.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedir-amigo-desdelista',
  templateUrl: './pedir-amigo-desdelista.page.html',
  styleUrls: ['./pedir-amigo-desdelista.page.scss'],
})
export class PedirAmigoDesdelistaPage implements OnInit {

  constructor(public route: ActivatedRoute,public contacto:ContactoService,private navCtrl: NavController) { }
  public monto_escrito;
  public monto;
  public referencia;
  public ultimos;
  // public busqueda;
  // public resultados;
  public buscando=false;
  public sinResutados=false
  public amigos ;
  ngOnInit() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p.var);
    this.amigos = p.var;

    

  }
  

  Continuar() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ monto:this.monto_escrito,amigos: this.amigos,referencia:this.referencia})
      }
    };
    this.navCtrl.navigateForward("pedir-amigo-desdelista2",navigationExtras);
  }
  Modificar() {
    this.navCtrl.navigateBack(["lista-amigos",{}]);
  }
}
