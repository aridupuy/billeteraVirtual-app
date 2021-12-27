import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcesarfotoscargadasPageRoutingModule } from './procesarfotoscargadas-routing.module';

import { ProcesarfotoscargadasPage } from './procesarfotoscargadas.page';
import { RenaperService } from '../../../service/renaper.service';
import { File } from '@ionic-native/file/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcesarfotoscargadasPageRoutingModule
  ],
  declarations: [ProcesarfotoscargadasPage],
  providers:[File,RenaperService,ScreenOrientation],
})
export class ProcesarfotoscargadasPageModule {}
