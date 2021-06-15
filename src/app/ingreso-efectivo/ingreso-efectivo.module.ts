import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoEfectivoPageRoutingModule } from './ingreso-efectivo-routing.module';

import { IngresoEfectivoPage } from './ingreso-efectivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoEfectivoPageRoutingModule
  ],
  declarations: [IngresoEfectivoPage]
})
export class IngresoEfectivoPageModule {}
