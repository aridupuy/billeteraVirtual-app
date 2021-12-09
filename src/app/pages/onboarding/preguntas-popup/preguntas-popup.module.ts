import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasPopupPageRoutingModule } from './preguntas-popup-routing.module';

import { PreguntasPopupPage } from './preguntas-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasPopupPageRoutingModule
  ],
  declarations: [PreguntasPopupPage]
})
export class PreguntasPopupPageModule {}
