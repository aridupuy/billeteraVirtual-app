import { Libs } from '../classes/libs';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-amigo2',
  templateUrl: './agregar-amigo2.page.html',
  styleUrls: ['./agregar-amigo2.page.scss'],
})
export class AgregarAmigo2Page implements OnInit {
  public iniciales; 
  public nombre;
  public dato;
  public p;
  public enviar;
  public pedir;
  public amigo=[];
  constructor(private navCtrl: NavController,public route:ActivatedRoute,public libs:Libs) { }

  ngOnInit() {
    console.log("aca amighos2");
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p.var);
    let v = p.var[0];
    this.iniciales = this.libs.iniciales(v.nombre);
    this.nombre = v.nombre;
    this.dato = v.email;
    this.enviar = p.envio;
    this.pedir = p.pedir;
    if(!this.enviar)
      this.pedir=true;
    this.amigo.push(p.var);
    this.p=p;
  }
  AgregarAmigo() {
    
  }
  ContinuarBuscar(){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(this.p)
      }
    };
    this.navCtrl.navigateForward("pedir-amigo-desdelista",navigationExtras);
  }
}
