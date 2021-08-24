import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../service/contacto.service';

@Component({
  selector: 'app-amigos-historial',
  templateUrl: './amigos-historial.page.html',
  styleUrls: ['./amigos-historial.page.scss'],
})
export class AmigosHistorialPage implements OnInit {
  public historial_pedidos=[];
  public historial_envios=[];
  public class_refresher = "";
  public offset=0;
  public limit = 5;
  public items;
  public itemback;
  public refrescar;
  constructor(public contacto:ContactoService) { }

  ngOnInit() {
    this.cargar_movimientos();
  }
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
  mostrar(event) {
    this.class_refresher = "refresher"

  }
  refresh(event) {
    this.offset = 0;
    this.historial_pedidos = [];
    this.itemback = undefined;
    this.refrescar = true;
    this.cargar_movimientos(event);
    
  }
  cargarmas(event) {
    console.log("aa");
    this.offset += this.limit;
    this.cargar_movimientos(event);

  }
  public cargar_movimientos(event?){
    this.contacto.obtener_historial_envios(this.offset,this.limit).then((data:any[])=>{
      console.log("aca3");
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
        
        if (event) {
          event.target.complete();
          this.class_refresher = "";
        }
      });
      // console.log(this.historial_pedidos);
    });
  }
}
