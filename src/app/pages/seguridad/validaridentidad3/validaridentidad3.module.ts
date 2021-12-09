import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Validaridentidad3PageRoutingModule } from './validaridentidad3-routing.module';

import { Validaridentidad3Page } from './validaridentidad3.page';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Validaridentidad3PageRoutingModule
  ],
  providers: [
    CameraPreview,
    ScreenOrientation,
  ],
  declarations: [Validaridentidad3Page]
})
export class Validaridentidad3PageModule {}
