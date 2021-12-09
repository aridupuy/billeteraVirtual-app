import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrofinalizadoPageRoutingModule } from './registrofinalizado-routing.module';

import { RegistrofinalizadoPage } from './registrofinalizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrofinalizadoPageRoutingModule
  ],
  declarations: [RegistrofinalizadoPage]
})
export class RegistrofinalizadoPageModule {}
