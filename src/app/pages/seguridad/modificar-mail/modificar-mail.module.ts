import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarMailPageRoutingModule } from './modificar-mail-routing.module';

import { ModificarMailPage } from './modificar-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarMailPageRoutingModule
  ],
  declarations: [ModificarMailPage]
})
export class ModificarMailPageModule {}
