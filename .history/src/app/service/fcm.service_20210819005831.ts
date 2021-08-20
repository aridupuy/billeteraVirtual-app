import { FCMServerService } from './fcmserver.service';
// import { FirebaseApp } from '@angular/fire';
import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
// import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
// import { FCM } from “cordova-plugin-fcm-with-dependecy-updated/ionic”;
// import www from '../../../plugins/cordova-plugin-fcm-with-dependecy-updated/src/www/rollup.config';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from '../../../plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { CordovaCheck } from '@ionic-native/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import * as firebase from 'firebase';
// import { firebaseConfig } from 'src/environments/firebaseconfig';
// import {
    // notification
// } from '../../../plugins/cordova-plugin-local-notification/src/windows/LocalNotificationProxy';
import { NavigationExtras } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class FcmService {


  constructor(
    private platform: Platform,public navCtrl:NavController,private fcm:FCM,private localnotif:LocalNotifications, public FCMServerservice: FCMServerService, public UniqueDeviceID:UniqueDeviceID ) {

    console.log("levantando fcm");
  }

  async getToken() {
    
    let token;
    console.log(this.fcm.hasOwnProperty("getToken"));
    if (this.platform.is('android') && FCM.hasOwnProperty("getToken")) {
      console.log("es android");
      await this.fcm.getToken().then(tok => {
        token = tok;
      });
      this.registerToken(token);
    }
    else if (this.platform.is('ios') && FCM.hasOwnProperty("getToken")) {
      console.log("es ios");
      await this.fcm.getToken().then(tok => {
        token = tok;
      });
      await this.fcm.requestPushPermission({
        ios9Support: {
          timeout: 10,  // How long it will wait for a decision from the user before returning `false`
          interval: 0.3 // How long between each permission verification
        }
      });
      this.registerToken(token);
    }
    else {
      console.log("FCM WEB");
      let tok = await localStorage.getItem("tokenFCM");
      console.log("aca FCM");
      if (tok == null || tok == undefined) {
        console.log("aca TOKENFCM");
        // token = Math.random() + Date.now().toString();
        // token = token.replace("0.", "0");
        // console.log(token.replace("0.","0"));
        // const msj=firebase.default.initializeApp(firebaseConfig);
        
        // const messaging = msj.messaging();
        // const messaging = getMessaging();

        // console.log(messaging);
        // getToken(messaging,{vapidKey: firebaseConfig.vapidKey}).then(tok=>{
        //   console.log("GetToken");
        //   console.log(token);
        //   this.registerToken(token);
        // });
        // await localStorage.setItem("tokenFCM", token);
        // console.log(FCM);
        
        // this.registerToken(token);
      }
      else {
        token = tok.toString().replace("0.", "0");
      }
    }
    if (this.fcm.hasOwnProperty("getToken"))
    // FCM.onTokenRefresh()
    this.fcm.onTokenRefresh().subscribe((token) => {
        this.registerToken(token);
      });
    this.onNotifications();
    // console.log(token);
  }

  // private saveToken(token) {
  //   if (!token) return;

  //   const devicesRef = this.afs.collection('devices');

  //   const data = {
  //     token,
  //     userId: 'testUserId'
  //   };

  //   return devicesRef.doc(token).set(data);
  // }
 public clickNotif;
 unsub(){
   this.clickNotif.unsubscribe();
 }
  onNotifications() {
    console.log("ACA NOTIFICACION ONNOTIFICATION");
    // console.log(this.fcm);
    // if (this.fcm.hasOwnProperty("getToken"))
      return this.fcm.onNotification().subscribe(data => {
        console.log("ACA NOTIFICACION RECIBIDA");
        console.log(JSON.stringify(data));
        // if (data.wasTapped) {
        //   console.log('Received in background');
        //   LocalNotifications.schedule({
        //     id: 1,
        //     text: data.title,
        //     icon: 'assets/img/logo.svg',
        //     smallIcon: 'assets/img/logo.svg',
        //     priority: 2,
        //     data: { body: data.body ,activity:data.activity,params:data.params},
        //     foreground: true,
        //     wakeup:true,
        //     group:"efectivoDigital",
        //     vibrate:true,
        //     lockscreen:true,
        //   });

        //   // this.router.navigate([data.landing_page, data.price]);
        // } else 
        {
          console.log(JSON.stringify(data));
          this.localnotif.schedule({
            id: 1,
            text: data.title,
            icon: 'res://assets/img/logo.svg',
            smallIcon: 'res://assets/img/logo.svg',
            priority: 2,
            data: { body: data.body ,activity:data.activity,params:data.params},
            foreground: true,
            vibrate:true,
            lockscreen:true,
            group:"efectivoDigital",
            launch:true,

          });
          this.clickNotif = this.localnotif.on("click").subscribe((notification)=>{
            console.log("CLICK EN NOTIFICACION");
            console.log(notification);
             if(notification.data.activity){
               let params = notification.data.params;
               const navigationExtras: NavigationExtras = {
                queryParams: {
  
                  param: JSON.stringify(params)
                }
              }
              this.unsub();
              this.navCtrl.navigateRoot(notification.data.activity,navigationExtras);
              
             }
        });
          console.log('Received in foreground');
          // this.router.navigate([data.landing_page, data.price]);
        }
      });
    
  }
  async registerToken(token) {
    localStorage.setItem("tokenFCM", token);
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
          console.log("DEVICENRO:" + uuid);
          this.FCMServerservice.refreshToken(token, this.platform, uuid, tipo);
        })
        .catch((error: any) => console.log(error));
    }
    else {
      device = Math.random() + Date.now().toString();
      this.FCMServerservice.refreshToken(token, this.platform, device, tipo);
    }

  }


}
