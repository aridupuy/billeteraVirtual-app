import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoDebitoPageRoutingModule } from './ingreso-debito-routing.module';

import { IngresoDebitoPage } from './ingreso-debito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoDebitoPageRoutingModule
  ],
  declarations: [IngresoDebitoPage]
})
export class IngresoDebitoPageModule {}
