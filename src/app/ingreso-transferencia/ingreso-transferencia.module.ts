import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoTransferenciaPageRoutingModule } from './ingreso-transferencia-routing.module';

import { IngresoTransferenciaPage } from './ingreso-transferencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoTransferenciaPageRoutingModule
  ],
  declarations: [IngresoTransferenciaPage]
})
export class IngresoTransferenciaPageModule {}
