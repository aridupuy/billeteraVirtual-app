import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarEfectivoMontoPageRoutingModule } from './ingresar-efectivo-monto-routing.module';

import { IngresarEfectivoMontoPage } from './ingresar-efectivo-monto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarEfectivoMontoPageRoutingModule
  ],
  declarations: [IngresarEfectivoMontoPage]
})
export class IngresarEfectivoMontoPageModule {}
