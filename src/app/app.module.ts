import { NgModule } from '@angular/core';
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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


declare var Hammer: any;
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL }, // DIRECTION_ALL
  };
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
      })],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    CameraPreview, FingerprintAIO , LoginService,
    ModalController,
    FormBuilder,
    BackgroundMode,
    Cookie,
    ServiceService,
    Geolocation,
    UsuarioService,
    
    // Pago,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

