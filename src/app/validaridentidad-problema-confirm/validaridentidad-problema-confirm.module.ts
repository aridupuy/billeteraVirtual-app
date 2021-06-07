import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidaridentidadProblemaConfirmPageRoutingModule } from './validaridentidad-problema-confirm-routing.module';

import { ValidaridentidadProblemaConfirmPage } from './validaridentidad-problema-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidaridentidadProblemaConfirmPageRoutingModule
  ],
  declarations: [ValidaridentidadProblemaConfirmPage]
})
export class ValidaridentidadProblemaConfirmPageModule {}
