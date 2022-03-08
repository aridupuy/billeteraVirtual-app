import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotedetransferenciaPageRoutingModule } from './lotedetransferencia-routing.module';

import { LotedetransferenciaPage } from './lotedetransferencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotedetransferenciaPageRoutingModule
  ],
  declarations: [LotedetransferenciaPage]
})
export class LotedetransferenciaPageModule {}
