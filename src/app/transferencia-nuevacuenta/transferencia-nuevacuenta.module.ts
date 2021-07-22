import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciaNuevacuentaPageRoutingModule } from './transferencia-nuevacuenta-routing.module';

import { TransferenciaNuevacuentaPage } from './transferencia-nuevacuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciaNuevacuentaPageRoutingModule
  ],
  declarations: [TransferenciaNuevacuentaPage]
})
export class TransferenciaNuevacuentaPageModule {}
