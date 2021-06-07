import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosCuentaPageRoutingModule } from './datos-cuenta-routing.module';

import { DatosCuentaPage } from './datos-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosCuentaPageRoutingModule
  ],
  declarations: [DatosCuentaPage]
})
export class DatosCuentaPageModule {}
