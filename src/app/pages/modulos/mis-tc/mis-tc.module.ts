import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisTcPageRoutingModule } from './mis-tc-routing.module';

import { MisTcPage } from './mis-tc.page';
import { TarjetasService } from '../../../service/tarjetas.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisTcPageRoutingModule
  ],
  declarations: [MisTcPage],
  providers:[TarjetasService]
})
export class MisTcPageModule {}
