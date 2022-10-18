import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx/index';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './service/login.service';
import { ServiceService } from './service/service.service';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UsuarioService } from './service/usuario.service';
import { Pago } from './classes/Pago';
import { ComponentsModule } from './components/components.module';
import {
    RespuestaResultadoComponent
} from './components/respuesta-resultado/respuesta-resultado.component';
import { Libs } from './classes/libs';
import { FcmService } from './service/fcm.service';

// import FCM from '../../plugins/cordova-plugin-fcm-with-dependecy-updated/www/FCMPlugin';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es-AR';
registerLocaleData(localeEs, 'es-AR');

import { HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
// import splash from '../../resources/splash.png';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocalNotifications as localnotif } from '@awesome-cordova-plugins/local-notifications/ngx';
import { SplashComponent } from './components/splash/splash.component';
import { firebaseConfig } from '../environments/firebaseconfig';
import { Httpinterceptor, DEFAULT_TIMEOUT } from './classes/httpinterceptor';
import { FormTcPageModule } from './pages/modulos/form-tc/form-tc.module';
import { DatosTarjetaPageModule } from './pages/modulos/datos-tarjeta/datos-tarjeta.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularFireModule } from '@angular/fire/';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
declare var Hammer: any;
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL }, // DIRECTION_ALL
  };
}
@NgModule({
  declarations: [AppComponent,SplashComponent],
  entryComponents: [],
  imports: [ComponentsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
      }),
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireMessagingModule,
      FormTcPageModule,
      DatosTarjetaPageModule,
      // ServiceWorkerModule.register("firebase-messaging-sw.js",{enabled:true})
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    CameraPreview, FingerprintAIO , LoginService,
    ModalController,
    FormBuilder,
    BackgroundMode,
    Cookie,
    ServiceService,
    LocalNotifications,
    localnotif,
    UsuarioService,
    Libs,
    Pago,
    UniqueDeviceID,
    FcmService,
    FCM,
    
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    { provide: HTTP_INTERCEPTORS, useClass: Httpinterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  jit:true
})
export class AppModule {}

