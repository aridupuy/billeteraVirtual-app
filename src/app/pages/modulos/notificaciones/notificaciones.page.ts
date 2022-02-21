import {
  notification
} from '../../../../../plugins/cordova-plugin-local-notification/src/windows/LocalNotificationProxy';
import { NotificacionesService } from '../../../service/notificaciones.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit, OnDestroy {
  public items;
  public class_refresher = "";
  public class = "circulo rojo";
  public class_texto = "texto";

  constructor(private notifService: NotificacionesService,private navCtrol:NavController) { }
  ngOnDestroy(): void {
    console.log(this.items.filter(data=>{data.visto=="f"}));
    this.items.filter(data=>{return data.visto=="f"}).forEach(notificacion => {
      this.notifService.marcar_visto(notificacion.id_notificacion).catch(err => {
        console.log(err);
      });
    });
  }

  async ngOnInit() {
    await this.obtener_notificaciones();
    
  }

  obtener_notificaciones() {
    this.notifService.obtener_notificaciones().then(data => {
      this.items = data;
    });
    return this.items;
  }
  verMas(item) {
    console.log(item);
    this.navCtrol.navigateForward(item.activity==null?"home":item.activity);
  }
  refresh(e) {
    return this.ngOnInit();
  }
  mostrar(event: any) {
    this.class_refresher = "refresher"
  }
  validar_class(item) {
    if (item.nuevo || item.visto == 'f')
      return this.class;
    return "circulo gris";
  }
  validar_class_texto(item) {
    if (item.nuevo || item.visto == 'f')
      return "texto bold";
    return this.class_texto;
  }
 
  IrAtras() {
    history.back();
  }
}
