import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoTransferenciaPageRoutingModule } from './ingreso-transferencia-routing.module';

import { IngresoTransferenciaPage } from './ingreso-transferencia.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoTransferenciaPageRoutingModule
  ],
  providers:[Clipboard],
  declarations: [IngresoTransferenciaPage]
})
export class IngresoTransferenciaPageModule {}
