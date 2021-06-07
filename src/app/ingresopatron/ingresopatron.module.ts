import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresopatronPageRoutingModule } from './ingresopatron-routing.module';

import { IngresopatronPage } from './ingresopatron.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresopatronPageRoutingModule
  ],
  declarations: [IngresopatronPage]
})
export class IngresopatronPageModule {}
