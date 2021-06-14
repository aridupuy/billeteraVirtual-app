import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoDebito2PageRoutingModule } from './ingreso-debito2-routing.module';

import { IngresoDebito2Page } from './ingreso-debito2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoDebito2PageRoutingModule
  ],
  declarations: [IngresoDebito2Page]
})
export class IngresoDebito2PageModule {}
