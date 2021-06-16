import { ContactoService } from '../service/contacto.service';
import { Icontacto } from '../interfaces/Icontacto';
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
  constructor(public route: ActivatedRoute,public contacto:ContactoService,private navCtrl: NavController) { }

  ngOnInit() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    this.monto = p.monto;
    this.amigos  = p.amigos;
    this.referencia = p.referencia;
  }
  Continuar() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      }
    };
    new Promise((resolve,rejects)=>{
      this.amigos.forEach(async (amigo:Icontacto,index,array) => {
        this.cargando=true;
        
        await this.contacto.crear_pedido(amigo.id,this.monto,this.referencia).then(data=>{
          console.log(data);
        });
        if(index==array.length-1){
            resolve(amigo);
        }
      });

    }).then((data)=>{
      this.cargando= false;
      this.navCtrl.navigateForward("amigos");
    });
    
    
    
  }
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
