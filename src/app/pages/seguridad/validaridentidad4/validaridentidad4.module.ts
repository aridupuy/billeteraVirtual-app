import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Validaridentidad4PageRoutingModule } from './validaridentidad4-routing.module';

import { Validaridentidad4Page } from './validaridentidad4.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Validaridentidad4PageRoutingModule
  ],
  providers: [
    CameraPreview,
    ScreenOrientation,
  ],
  declarations: [Validaridentidad4Page]
})
export class Validaridentidad4PageModule {}
