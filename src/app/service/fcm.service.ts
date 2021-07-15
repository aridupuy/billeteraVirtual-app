import { FCMServerService } from './fcmserver.service';
// import { FirebaseApp } from '@angular/fire';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import www from '../../../plugins/cordova-plugin-fcm-with-dependecy-updated/src/www/rollup.config';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';



@Injectable({
  providedIn: 'root'
})
export class FcmService {


  constructor(private localNotifications: LocalNotifications,
    private platform: Platform, public FCMServerservice: FCMServerService,public UniqueDeviceID:UniqueDeviceID) {

    console.log("levantando fcm");
  }

  async getToken() {
    let token;
    
    if (this.platform.is('android')) {
      console.log("es android");
      await FCM.getToken().then(tok => {
        token = tok;
      });
    }
    else if (this.platform.is('ios')) {
      console.log("es ios");
      await FCM.getToken().then(tok => {
        token = tok;
      });
      await FCM.requestPushPermission({
        ios9Support: {
          timeout: 10,  // How long it will wait for a decision from the user before returning `false`
          interval: 0.3 // How long between each permission verification
        }
      });
    }
    else {
      let tok = await localStorage.getItem("tokenFCM");
      console.log("aca");
        if (tok == null || tok == undefined) {
          console.log("aca");
          token = Math.random() + Date.now().toString();
          token = token.replace("0.","0");
          // console.log(token.replace("0.","0"));
          await localStorage.setItem("tokenFCM", token);
          this.registerToken(token);
        }
        else {
          token = tok.toString().replace("0.","0");
        }
    }
    FCM.onTokenRefresh().subscribe((token)=>{
      this.registerToken(token);
    })
    this.registerToken(token);
    console.log(token);
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

  onNotifications() {
    
    return FCM.onNotification().subscribe(data=>{
      if (data.wasTapped) {
        console.log('Received in background');
        this.localNotifications.schedule({
          id: 1,
          text: data.title,
          data: { body: data.body }
        });
        
        // this.router.navigate([data.landing_page, data.price]);
      } else {
        this.localNotifications.schedule({
          id: 1,
          text: data.title,
          icon:'../../assets/img/logo.svg',
          priority:2,
          data: { body: data.body },
          foreground:true,
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
            .then((uuid: any) =>{
              console.log("DEVICENRO:"+uuid);
              this.FCMServerservice.refreshToken(token, this.platform,uuid,tipo);
            })
            .catch((error: any) => console.log(error));
    }
    else {
        device = Math.random() + Date.now().toString();
        this.FCMServerservice.refreshToken(token, this.platform,device,tipo);
    }
    
  }


}
