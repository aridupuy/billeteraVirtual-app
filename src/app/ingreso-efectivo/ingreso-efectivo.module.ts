import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoEfectivoPageRoutingModule } from './ingreso-efectivo-routing.module';

import { IngresoEfectivoPage } from './ingreso-efectivo.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoEfectivoPageRoutingModule
  ],
  providers:[Clipboard],
  declarations: [IngresoEfectivoPage]
})
export class IngresoEfectivoPageModule {}
