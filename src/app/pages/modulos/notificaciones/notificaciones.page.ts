import {
    notification
} from '../../../../../plugins/cordova-plugin-local-notification/src/windows/LocalNotificationProxy';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit,OnDestroy {
  public items;
  public class_refresher = "";
  public class= "circulo rojo";
  public class_texto="texto";

  constructor() { }

  ngOnInit() {
    this.items= JSON.parse(localStorage.getItem("notification"));
    this.items.reverse();
  }
  verMas(item){
    console.log(item);

  }
  refresh(e){
    return this.ngOnInit();
  }
  mostrar(event: any) {
    this.class_refresher = "refresher"
  }
  validar_class(item){
    if(item.nuevo)
        return this.class;
    return "circulo gris";  
  }
  validar_class_texto(item){
    if(item.nuevo)
      return "texto bold";
    return this.class_texto;
  }
  ngOnDestroy(){
    let items= JSON.parse(localStorage.getItem("notification"));
    items.map((item)=>{
      console.log(item);
      item.nuevo=false;
    })
    localStorage.setItem("notification",JSON.stringify(items));
  }
  
}
