import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, Platform } from '@ionic/angular';

import { Validaridentidad1PageRoutingModule } from './validaridentidad1-routing.module';

import { Validaridentidad1Page } from './validaridentidad1.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Validaridentidad1PageRoutingModule
  ],
  declarations: [Validaridentidad1Page],
  providers:[
    CameraPreview,
    ScreenOrientation,
    Platform,
    Location,
    
  ]
})
export class Validaridentidad1PageModule {}
