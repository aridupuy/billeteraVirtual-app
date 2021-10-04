import { FCMServerService } from './fcmserver.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavigationExtras } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  currentMessage= new BehaviorSubject(null);
  constructor(
    public angularFireMessaging: AngularFireMessaging,private platform: Platform,public navCtrl:NavController,private fcm:FCM,private localnotif:LocalNotifications, public FCMServerservice: FCMServerService, public UniqueDeviceID:UniqueDeviceID ) {

    console.log("levantando fcm");
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
        data: { body: payload.notification.body ,activity:payload.notification.activity},
        foreground: true,
        vibrate:true,
        lockscreen:true,
        group:"efectivoDigital",
        launch:true,

      });
      this.currentMessage.next(payload);
    });
  }
  async getToken() {
    this.localnotif.schedule({
      id: 1,
      title:"Efectivo Digital",
      text: "Capture token aca",
      icon: 'res://ic_notificacion.png',
      smallIcon: 'res://ic_notificacion.png',
      color:"e9434d",
      priority: 0,
      foreground: true,
      vibrate:true,
      wakeup:true,
      lockscreen:true,
      silent:false,
      //color:"27b199",
      
      // 70706f
      group:"efectivoDigital",
      groupSummary:true,
      launch:true,

    });
   
    let token;
    console.log(this.fcm.hasOwnProperty("getToken"));
    // if (this.platform.is('android') && FCM.hasOwnProperty("getToken")) {
      if (this.platform.is('android') ) {
      console.log("es android");
      await this.fcm.getToken().then(tok => {
        token = tok;
        console.log(tok);
      });
      this.registerToken(token);
      if (this.fcm.hasOwnProperty("getToken"))
      this.fcm.onTokenRefresh().subscribe((token) => {
        this.registerToken(token);
      });
     this.onNotifications();
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
      if (this.fcm.hasOwnProperty("getToken"))
      this.fcm.onTokenRefresh().subscribe((token) => {
        this.registerToken(token);
      });
      this.onNotifications();
    }
    else {
      console.log("FCM WEB");
      let tok = await localStorage.getItem("tokenFCM");
      console.log("aca FCM");
      console.log(tok);
      if (tok == null || tok == undefined) {
        console.log("aca TOKENFCM");
        this.angularFireMessaging.requestPermission.toPromise().then(data=>{
          this.angularFireMessaging.requestToken.subscribe(data=>{
            console.log("requested Token");
            this.angularFireMessaging.getToken.subscribe(data=>{
              console.log("registrando Messages");
              this.receiveMessage();
              console.log(data);
              this.registerToken(data);
            })
          });
          // this.angularFireMessaging.onTokenRefresh((data)=>{
          //   this.registerToken(data);
          // })
          // this.angularFireMessaging.onBackgroundMessage(data=>{
          //   console.log("MENSAJE:");
          //   console.log(data);
          // })
          console.log(this.angularFireMessaging);
          // this.angularFireMessaging.onMessage((data)=>{
        //     console.log("mensaje");
        //     console.log(data);
        //     this.localnotif.schedule({
        //       id: 1,
        //       text: data.title,
        //       icon: 'res://assets/img/logo.svg',
        //       smallIcon: 'res://assets/img/logo.svg',
        //       priority: 2,
        //       data: { body: data.body ,activity:data.activity,params:data.params},
        //       foreground: true,
        //       vibrate:true,
        //       lockscreen:true,
        //       group:"efectivoDigital",
        //       launch:true,
  
        //     });
        //   })
        }).catch(err=>{
          console.error(err);
        })
        
        
        
        

        // const messaging = msj.messaging();
        // const messaging = getMessaging();

        // console.log(messaging);
        // getToken(messaging,{vapidKey: firebaseConfig.vapidKey}).then(tok=>{
        //   console.log("GetToken");
        //   console.log(token);
        //   this.registerToken(token);
        // // });
        // await localStorage.setItem("tokenFCM", token);
        // console.log(FCM);
        
        // this.registerToken(token);
      }
      else {
        token = tok.toString().replace("0.", "0");
      }
    }
    
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
          this.localnotif.getDefaults();
          this.localnotif.schedule({
            id: 1,
            title:"Efectivo Digital",
            text: data.title,
            icon: 'res://mipmap/ic_launcher.png',
            smallIcon: 'assets://www/assets/ic_notification2.png',
            color:"e9434d",
            priority: 0,
            data: { body: data.body ,activity:data.activity,params:data.params},
            foreground: true,
            vibrate:true,
            wakeup:true,
            lockscreen:true,
            silent:false,
            group:"efectivoDigital",
            groupSummary:true,
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
    if(!token)
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
