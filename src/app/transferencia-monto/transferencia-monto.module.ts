import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciaMontoPageRoutingModule } from './transferencia-monto-routing.module';

import { TransferenciaMontoPage } from './transferencia-monto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciaMontoPageRoutingModule
  ],
  declarations: [TransferenciaMontoPage]
})
export class TransferenciaMontoPageModule {}
