import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTransaccionPageRoutingModule } from './detalle-transaccion-routing.module';

import { DetalleTransaccionPage } from './detalle-transaccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTransaccionPageRoutingModule
  ],
  declarations: [DetalleTransaccionPage]
})
export class DetalleTransaccionPageModule {}
