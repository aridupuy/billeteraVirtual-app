import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Validaridentidad2PageRoutingModule } from './validaridentidad2-routing.module';

import { Validaridentidad2Page } from './validaridentidad2.page';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Validaridentidad2PageRoutingModule
  ],
  providers: [
    CameraPreview,
    ScreenOrientation,
  ],
  declarations: [Validaridentidad2Page]
})
export class Validaridentidad2PageModule {}
