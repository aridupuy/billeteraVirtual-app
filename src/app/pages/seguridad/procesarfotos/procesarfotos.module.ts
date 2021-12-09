import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcesarfotosPageRoutingModule } from './procesarfotos-routing.module';

import { ProcesarfotosPage } from './procesarfotos.page';
import { RenaperService } from '../../../service/renaper.service';
import { File } from '@ionic-native/file/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcesarfotosPageRoutingModule
  ],
  providers:[File,RenaperService,ScreenOrientation],
  declarations: [ProcesarfotosPage]
})
export class ProcesarfotosPageModule {}
