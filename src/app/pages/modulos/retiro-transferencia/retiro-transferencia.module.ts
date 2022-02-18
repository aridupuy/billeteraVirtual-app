import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetiroTransferenciaPageRoutingModule } from './retiro-transferencia-routing.module';

import { RetiroTransferenciaPage } from './retiro-transferencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetiroTransferenciaPageRoutingModule
  ],
  declarations: [RetiroTransferenciaPage]
})
export class RetiroTransferenciaPageModule {}
