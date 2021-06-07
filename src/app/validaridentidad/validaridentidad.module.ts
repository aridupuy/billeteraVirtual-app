import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidaridentidadPageRoutingModule } from './validaridentidad-routing.module';

import { ValidaridentidadPage } from './validaridentidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidaridentidadPageRoutingModule
  ],
  declarations: [ValidaridentidadPage]
})
export class ValidaridentidadPageModule {}
