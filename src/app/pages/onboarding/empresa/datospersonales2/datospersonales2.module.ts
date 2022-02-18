import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Datospersonales2PageRoutingModule } from './datospersonales2-routing.module';

import { Datospersonales2Page } from './datospersonales2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Datospersonales2PageRoutingModule
  ],
  declarations: [Datospersonales2Page]
})
export class Datospersonales2PageModule {}
