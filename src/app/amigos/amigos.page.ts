import { ContactoService } from '../service/contacto.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  constructor(private navCtrl: NavController,public contacto:ContactoService) { }
  public envios=[];
  public pedidos=[];
  public historial_pedidos=[];
  public historial_envios=[];
  // () {

  // }
  ngOnInit(){
    this.cargarData();
  }
  cargarData(){
    this.contacto.obtener_pedidos_dinero().then((data:any[])=>{
      console.log("aca2");
      console.log(data);
      data.forEach(d=>{
        // console.log(d.nombre);
        d["iniciales"]=d.nombre
                .split(' ')
                .map( it => it.charAt(0) )
                .slice(0,2)
                .join('');
        this.envios.push(d);
      });
    }).catch(err=>{
      this.envios=[];
    });
    console.log(this.envios);
    this.contacto.obtener_pedidos_dinero_otros().then((data:any[])=>{
      console.log("aca");
      data.forEach(d=>{
        d["iniciales"]=d.nombre
        .split(' ')
        .map( it => it.charAt(0) )
        .slice(0,2)
        .join('');
        this.pedidos.push(d);
      });
    }).catch(err=>{
      this.pedidos=[];
    });
    this.contacto.obtener_historial_envios().then((data:any[])=>{
      console.log("aca3");
      data.forEach(d=>{
        data.forEach(d=>{
          d["iniciales"]=d.nombre_receptor
          .split(' ')
          .map( it => it.charAt(0) )
          .slice(0,2)
          .join('');
        });
        if(d.condicion=='pide'){
          d["iniciales"]=d.nombre
          .split(' ')
          .map( it => it.charAt(0) )
          .slice(0,2)
          .join('');
          this.historial_pedidos.push(d);
        }
        else{
          d["iniciales"]=d.nombre
          .split(' ')
          .map( it => it.charAt(0) )
          .slice(0,2)
          .join('');
          this.historial_envios.push(d);
        }
        
        
      });
    });

  }
  fecha_espaniol(fecha){
  
    switch(fecha){
      case "1":
        return "Enero";
        break;
      case "2":
        return "Febrero";
        break;
      case "3":
        return "Marzo";
        break;
      case "4":
        return "Abril";
        break;
      case "5":
        return "Mayo";
        break;
      case "6":
        return "Junio";
        break;
      case "7":
        return "Julio";
        break;
      case "8":
        return "Agosto";
        break;
      case "9":
        return "Septiembre";
        break;
      case "10":
        return "Octubre";
        break;
      case "11":
        return "Noviembre";
        break;
      case "12":
        return "Diciembre";
        break;
    }
  }
  pedirdinero() {
  this.navCtrl.navigateForward("pedir-amigo");
  }
  enviardinero() {
  this.navCtrl.navigateForward("enviar-amigo");
  }
  agregarAmigo(){}

  aceptar(item){
    this.contacto.aceptar_pedido_saldo(item.id).then(()=>{
      this.envios=[];
      this.pedidos=[];
      this.historial_envios=[];
      this.historial_pedidos=[];
      return this.cargarData();
    });
    console.log(item);
  }
  rechazar(item){
    this.contacto.rechazar_pedido(item.id).then(()=>{
        this.envios=[];
        this.pedidos=[];
        this.historial_envios=[];
        this.historial_pedidos=[];
        return this.cargarData();
    });
    console.log(item);
  }
}
