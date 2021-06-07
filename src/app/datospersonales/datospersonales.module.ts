import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatospersonalesPageRoutingModule } from './datospersonales-routing.module';

import { DatospersonalesPage } from './datospersonales.page';
import { RenaperService } from '../service/renaper.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatospersonalesPageRoutingModule
  ],
  declarations: [DatospersonalesPage],
  providers:[RenaperService]
})
export class DatospersonalesPageModule {}
