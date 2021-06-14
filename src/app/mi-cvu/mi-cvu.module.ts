import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCvuPageRoutingModule } from './mi-cvu-routing.module';

import { MiCvuPage } from './mi-cvu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiCvuPageRoutingModule
  ],
  declarations: [MiCvuPage]
})
export class MiCvuPageModule {}
