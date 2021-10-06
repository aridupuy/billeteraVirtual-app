import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarcuentaPageRoutingModule } from './cambiarcuenta-routing.module';

import { CambiarcuentaPage } from './cambiarcuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarcuentaPageRoutingModule
  ],
  declarations: [CambiarcuentaPage]
})
export class CambiarcuentaPageModule {}
