import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarCelPageRoutingModule } from './modificar-cel-routing.module';

import { ModificarCelPage } from './modificar-cel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarCelPageRoutingModule
  ],
  declarations: [ModificarCelPage]
})
export class ModificarCelPageModule {}
