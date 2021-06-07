import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarfotosPageRoutingModule } from './revisarfotos-routing.module';

import { RevisarfotosPage } from './revisarfotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarfotosPageRoutingModule
  ],
  declarations: [RevisarfotosPage]
})
export class RevisarfotosPageModule {}
