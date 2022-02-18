import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidaridentidadProblemaPageRoutingModule } from './validaridentidad-problema-routing.module';

import { ValidaridentidadProblemaPage } from './validaridentidad-problema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidaridentidadProblemaPageRoutingModule
  ],
  declarations: [ValidaridentidadProblemaPage]
})
export class ValidaridentidadProblemaPageModule {}
