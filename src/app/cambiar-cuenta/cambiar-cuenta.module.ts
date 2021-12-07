import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarCuentaPageRoutingModule } from './cambiar-cuenta-routing.module';

import { CambiarCuentaPage } from './cambiar-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarCuentaPageRoutingModule
  ],
  declarations: [CambiarCuentaPage]
})
export class CambiarCuentaPageModule {}
