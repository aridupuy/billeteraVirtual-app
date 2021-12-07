import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionesPageRoutingModule } from './confirmaciones-routing.module';

import { ConfirmacionesPage } from './confirmaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacionesPageRoutingModule
  ],
  declarations: [ConfirmacionesPage]
})
export class ConfirmacionesPageModule {}
