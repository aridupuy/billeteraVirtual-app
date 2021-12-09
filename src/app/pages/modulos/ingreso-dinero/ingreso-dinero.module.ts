import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoDineroPageRoutingModule } from './ingreso-dinero-routing.module';

import { IngresoDineroPage } from './ingreso-dinero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoDineroPageRoutingModule
  ],
  declarations: [IngresoDineroPage]
})
export class IngresoDineroPageModule {}
