import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarfotosPageRoutingModule } from './revisarfotos-routing.module';

import { RevisarfotosPage } from './revisarfotos.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarfotosPageRoutingModule
  ],
  declarations: [RevisarfotosPage],
  providers:[ScreenOrientation]
})
export class RevisarfotosPageModule {}
