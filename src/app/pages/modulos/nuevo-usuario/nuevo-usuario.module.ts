import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoUsuarioPageRoutingModule } from './nuevo-usuario-routing.module';

import { NuevoUsuarioPage } from './nuevo-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoUsuarioPageRoutingModule
  ],
  declarations: [NuevoUsuarioPage]
})
export class NuevoUsuarioPageModule {}
