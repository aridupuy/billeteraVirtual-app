import { FCMServerService } from './fcmserver.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { NotificacionesService } from './notificaciones.service';
import {
  notification
} from '../../../plugins/cordova-plugin-local-notification/src/windows/LocalNotificationProxy';
import { Observable } from '../classes/observable';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavigationExtras } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  currentMessage = new BehaviorSubject(null);
  constructor(
    public angularFireMessaging: AngularFireMessaging, private platform: Platform, public navCtrl: NavController, private fcm: FCM, private localnotif: LocalNotifications, public FCMServerservice: FCMServerService, public UniqueDeviceID: UniqueDeviceID, private notifService: NotificacionesService) {

    // console.log("levantando fcm");
  }
  receiveMessage() {
    this.angularFireMessaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.localnotif.schedule({
        id: 1,
        text: payload.notification.title,
        icon: 'file://assets/img/logo.svg',
        smallIcon: 'file://assets/img/logo.svg',
        priority: 2,
        data: { body: payload.notification.body, activity: payload.notification.activity },
        foreground: true,
        vibrate: true,
        lockscreen: true,
        group: "efectivoDigital",
        launch: true,

      });
      console.log(payload);
      this.guardar_notificacion(payload);
      this.currentMessage.next(payload);
    });
  }
  async getToken() {
    let token;
    this.platform.ready().then(async () => {
      console.log(this.fcm.hasOwnProperty("getToken"));
      // if (this.platform.is('android') && FCM.hasOwnProperty("getToken")) {
      if (this.platform.is('android') && this.platform.is('cordova')) {
        // console.log("es android");
        await this.fcm.getToken().then(tok => {
          token = tok;
          // console.log(tok);
        });
        this.registerToken(token);
        // console.log("TOKEN OBTENIDO.");
        await this.fcm.onTokenRefresh().subscribe((token) => {
          this.registerToken(token);
          // console.log("SUSCRIBIENDO NOTIFICACIONES");
        });
        await this.onNotifications();
      }
      else if (this.platform.is('ios') && this.platform.is('cordova')) {
        // console.log("es ios");
        await this.fcm.getToken().then(tok => {
          token = tok;
          // console.log("TOKENFCM : " + tok);
        });
        await this.fcm.requestPushPermission({
          ios9Support: {
            timeout: 10,  // How long it will wait for a decision from the user before returning `false`
            interval: 0.3 // How long between each permission verification
          }
        });
        this.registerToken(token);
        await this.fcm.onTokenRefresh().subscribe((token) => {
          this.registerToken(token);

        });
        await this.onNotifications();
      }
      else {
        // console.log("FCM WEB");
        let tok = await localStorage.getItem("tokenFCM");
        // console.log("aca FCM");
        console.log(tok);
        if (tok == null || tok == undefined) {
          // console.log("aca TOKENFCM");
          this.angularFireMessaging.requestPermission.toPromise().then(data => {
            this.angularFireMessaging.requestToken.subscribe(data => {
              // console.log("requested Token");
              this.angularFireMessaging.getToken.subscribe(data => {
                // console.log("registrando Messages");
                this.receiveMessage();
                // console.log(data);
                this.registerToken(data);
              })
            });

          }).catch(err => {
            console.error(err);
          })
        }
        else {
          token = tok.toString().replace("0.", "0");
        }
      }
    });
  }
  public clickNotif;
  unsub() {
    this.clickNotif.unsubscribe();
  }
  guardar_notificacion(data) {

    console.log(data);
    let notifs = [];
    let notif = {
      data: data.notification.body,
      nuevo: true,
      titulo: data.notification.title,
      fecha: Date(),
      activity:data.data.activity
    }
    notifs = JSON.parse(localStorage.getItem("notification"));
    if (!notifs) {
      notifs = [notif];
    }
    else {
      notifs.push(notif);
    }
    localStorage.setItem("notification", JSON.stringify(notifs));
  }
  subscripto = false;
  ultima_noti;
  onNotifications() {
    if (!this.subscripto) {
      this.subscripto = true;
      return this.fcm.onNotification().subscribe(data => {
        console.log("ACA NOTIFICACION RECIBIDA");
        console.log(JSON.stringify(data));
        this.localnotif.getDefaults();
        if(data.wasTapped){
          console.log("ACA WASTAPPED");
          Observable.notify("tapNoti",data.activity);
          return true;
        }
        this.ultima_noti=Math.random();
        if (!data.data.id || data.data.id!=this.ultima_noti) {
          console.log("RECIBI NOTIFICACION");
          this.localnotif.schedule({
            id: this.ultima_noti,
            title: data.title,
            text: data.body,
            icon: 'res://ic_notificacion.png',
            smallIcon: 'res://ic_notificacion.png',
            color: "e9434d",
            priority: 10,
            data: { body: data.body, activity: data.activity, params: data.params,id:this.ultima_noti },
            foreground: true,
            vibrate: true,
            wakeup: true,
            lockscreen: true,
            silent: false,
            launch:false,
            group: "efectivoDigital",
            groupSummary: true,
          });
        }
        this.clickNotif = this.localnotif.on("click").subscribe((notification) => {
          // console.log("CLICK EN NOTIFICACION");
          console.log(notification);
          if (notification.data.activity) {
            let params = notification.data.params;
            const navigationExtras: NavigationExtras = {
              queryParams: {

                param: JSON.stringify(params)
              }
            }
            this.unsub();
            this.navCtrl.navigateRoot(notification.data.activity, navigationExtras);

          }
        });
        Observable.notify("notificacion-nueva", false);
        // console.log('Received in foreground');
        // this.router.navigate([data.landing_page, data.price]);
      });
    }
    else {
      // console.log("ya subscripto");
    }

  }
  async registerToken(token) {
    if (!token)
      return false;
    // localStorage.setItem("tokenFCM", token);
    var tipo = "navegador_" + this.platform.platforms()[0];
    if (this.platform.is("android")) {
      tipo = "android";
    }
    else if (this.platform.is("ios")) {
      tipo = "ios";
    }
    var device;
    if (this.platform.is("ios") || this.platform.is("android")) {
      await this.UniqueDeviceID.get()
        .then((uuid: any) => {
          // console.log("DEVICENRO:" + uuid);
          this.FCMServerservice.refreshToken(token, this.platform, uuid, tipo);
        })
        .catch((error: any) => console.log(error));
    }
    else {
      device = Math.random() + Date.now().toString();
      this.FCMServerservice.refreshToken(token, this.platform, device, tipo);
    }

  }
  public obtener_data_notificacion(){
    return this.fcm.getInitialPushPayload();
  }

}
