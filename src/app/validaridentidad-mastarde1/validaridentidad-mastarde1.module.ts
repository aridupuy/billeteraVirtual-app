import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidaridentidadMastarde1PageRoutingModule } from './validaridentidad-mastarde1-routing.module';

import { ValidaridentidadMastarde1Page } from './validaridentidad-mastarde1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidaridentidadMastarde1PageRoutingModule
  ],
  declarations: [ValidaridentidadMastarde1Page]
})
export class ValidaridentidadMastarde1PageModule {}
