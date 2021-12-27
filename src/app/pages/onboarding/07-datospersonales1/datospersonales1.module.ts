import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Datospersonales1PageRoutingModule } from './datospersonales1-routing.module';

import { Datospersonales1Page } from './datospersonales1.page';
import { RenaperService } from '../../../service/renaper.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Datospersonales1PageRoutingModule
  ],
  declarations: [Datospersonales1Page],
  providers:[RenaperService]
})
export class Datospersonales1PageModule {}