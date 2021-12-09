import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidaridentidadMastardePageRoutingModule } from './validaridentidad-mastarde-routing.module';

import { ValidaridentidadMastardePage } from './validaridentidad-mastarde.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidaridentidadMastardePageRoutingModule
  ],
  declarations: [ValidaridentidadMastardePage]
})
export class ValidaridentidadMastardePageModule {}
