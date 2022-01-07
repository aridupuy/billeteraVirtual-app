import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPassPageRoutingModule } from './registro-pass-routing.module';

import { RegistroPassPage } from './registro-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPassPageRoutingModule
  ],
  declarations: [RegistroPassPage]
})
export class RegistroPassPageModule {}
