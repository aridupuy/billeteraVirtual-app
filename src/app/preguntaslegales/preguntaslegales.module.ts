import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntaslegalesPageRoutingModule } from './preguntaslegales-routing.module';

import { PreguntaslegalesPage } from './preguntaslegales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntaslegalesPageRoutingModule
  ],
  declarations: [PreguntaslegalesPage]
})
export class PreguntaslegalesPageModule {}
