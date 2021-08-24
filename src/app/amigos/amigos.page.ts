import { ContactoService } from '../service/contacto.service';
import { Persona } from '../models/persona';
import { Deuda } from '../models/deuda';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {
  public envios=[];
  public pedidos=[];
  public historial_pedidos=[];
  public historial_envios=[];
  public limit = 5;
  public offset = 0;
  constructor(private navCtrl: NavController,public contacto:ContactoService) { }
 
  // () {

  // }
  myDateParser(dateStr : string) : string {
    

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)
    if(millisecond==""){
      millisecond="00";
    }
    let validDate = date + 'T' + time + '.' + millisecond;
    return validDate
  }


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
        d.fecha = this.myDateParser(d.fecha);

        this.envios.push(d);
      });
    }).catch(err=>{
      this.envios=[];
    });
    // console.log(this.envios);
    this.contacto.obtener_pedidos_dinero_otros().then((data:any[])=>{
      // console.log("aca");
      data.forEach(d=>{
        d["iniciales"]=d.nombre
        .split(' ')
        .map( it => it.charAt(0) )
        .slice(0,2)
        .join('');
        d.fecha = this.myDateParser(d.fecha);
        this.pedidos.push(d);
      });
    }).catch(err=>{
      this.pedidos=[];
    });
    this.contacto.obtener_historial_envios(this.offset,this.limit).then((data:any[])=>{
      // console.log("aca3");
      data.forEach(d=>{
        
        data.forEach(d=>{
          // console.log(d);
          d["iniciales"]= (d.nombre_receptor!=null) ?d.nombre_receptor
          .split(' ')
          .map( it => it.charAt(0) )
          .slice(0,2)
          .join('') : "";
        });
        d["rechazo"]=(d.id_authstat==141)?true:false;
        if(d.condicion=='pide'){
          d["recibido"]=true;
          d["pago"]=false;
          
        }
         else{ 
          d["recibido"]=false;
          d["pago"]=true;
          // d["rechazo"]=(d.id_authstat)?true:false;
        }
          d["iniciales"]=(d.nombre!=null) ?d.nombre 
          .split(' ')
          .map( it => it.charAt(0) )
          .slice(0,2)
          .join('') : "";
          d.fecha = this.myDateParser(d.fecha);
          this.historial_pedidos.push(d);

        // }
        // else{
        //   d["iniciales"]=(d.nombre!=null) ?d.nombre
        //   .split(' ')
        //   .map( it => it.charAt(0) )
        //   .slice(0,2)
        //   .join('') : "";
        //   this.historial_envios.push(d);
        // }
        
        
      });
      // console.log(this.historial_pedidos);
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
    const persona:Persona={id:item.id,nombre:item.nombre,iniciales:item.iniciales};
    const deuda:Deuda={monto:item.monto,mensaje:item.mensaje,id:item.id,tipo_deuda:"Contacto"};
    // this.contacto.aceptar_pedido_saldo(item.id).then(()=>{
    //   this.envios=[];
    //   this.pedidos=[];
    //   this.historial_envios=[];
    //   this.historial_pedidos=[];
    //   return this.cargarData();
    // });
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({persona:persona,deuda:deuda,url:"amigos"})
      }
    };
    this.navCtrl.navigateRoot("pagar",navigationExtras);
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
  irAHistorial(){
    this.navCtrl.navigateForward("amigos-historial");
  }
}
