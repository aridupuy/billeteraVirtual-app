import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentacreadaPageRoutingModule } from './cuentacreada-routing.module';

import { CuentacreadaPage } from './cuentacreada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentacreadaPageRoutingModule
  ],
  declarations: [CuentacreadaPage]
})
export class CuentacreadaPageModule {}
