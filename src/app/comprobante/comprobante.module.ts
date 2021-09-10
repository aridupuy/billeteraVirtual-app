import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprobantePageRoutingModule } from './comprobante-routing.module';

import { ComprobantePage } from './comprobante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprobantePageRoutingModule
  ],
  declarations: [ComprobantePage]
})
export class ComprobantePageModule {}
