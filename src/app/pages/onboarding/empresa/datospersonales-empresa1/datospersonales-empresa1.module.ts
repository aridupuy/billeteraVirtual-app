import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatospersonalesEmpresa1PageRoutingModule } from './datospersonales-empresa1-routing.module';

import { DatospersonalesEmpresa1Page } from './datospersonales-empresa1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatospersonalesEmpresa1PageRoutingModule
  ],
  declarations: [DatospersonalesEmpresa1Page]
})
export class DatospersonalesEmpresa1PageModule {}
