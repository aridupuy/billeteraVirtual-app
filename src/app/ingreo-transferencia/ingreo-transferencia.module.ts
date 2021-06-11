import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngreoTransferenciaPageRoutingModule } from './ingreo-transferencia-routing.module';

import { IngreoTransferenciaPage } from './ingreo-transferencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngreoTransferenciaPageRoutingModule
  ],
  declarations: [IngreoTransferenciaPage]
})
export class IngreoTransferenciaPageModule {}
