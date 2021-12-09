import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTransaccionPageRoutingModule } from './detalle-transaccion-routing.module';

import { DetalleTransaccionPage } from './detalle-transaccion.page';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTransaccionPageRoutingModule,
    
  ],
  declarations: [DetalleTransaccionPage],
  providers:[PDFGenerator]
})
export class DetalleTransaccionPageModule {}
