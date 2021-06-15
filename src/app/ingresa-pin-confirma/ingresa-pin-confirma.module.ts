import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresaPinConfirmaPageRoutingModule } from './ingresa-pin-confirma-routing.module';

import { IngresaPinConfirmaPage } from './ingresa-pin-confirma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresaPinConfirmaPageRoutingModule
  ],
  declarations: [IngresaPinConfirmaPage]
})
export class IngresaPinConfirmaPageModule {}
