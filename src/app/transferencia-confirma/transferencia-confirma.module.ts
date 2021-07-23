import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciaConfirmaPageRoutingModule } from './transferencia-confirma-routing.module';

import { TransferenciaConfirmaPage } from './transferencia-confirma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciaConfirmaPageRoutingModule
  ],
  declarations: [TransferenciaConfirmaPage]
})
export class TransferenciaConfirmaPageModule {}
