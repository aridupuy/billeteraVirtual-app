import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresaPinPageRoutingModule } from './ingresa-pin-routing.module';

import { IngresaPinPage } from './ingresa-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresaPinPageRoutingModule
  ],
  declarations: [IngresaPinPage]
})
export class IngresaPinPageModule {}
