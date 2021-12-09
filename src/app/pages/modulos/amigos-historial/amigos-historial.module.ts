import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmigosHistorialPageRoutingModule } from './amigos-historial-routing.module';

import { AmigosHistorialPage } from './amigos-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmigosHistorialPageRoutingModule
  ],
  declarations: [AmigosHistorialPage]
})
export class AmigosHistorialPageModule {}
