import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Datospersonales1PageRoutingModule } from './datospersonales1-routing.module';

import { Datospersonales1Page } from './datospersonales1.page';
import {
    Datospersonales1PageModule as DP1
} from '../../persona/07-datospersonales1/datospersonales1.module';
import { RenaperService } from '../../../../service/renaper.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Datospersonales1PageRoutingModule
  ],
  providers:[RenaperService,ScreenOrientation],
  declarations: [Datospersonales1Page]
})
export class Datospersonales1PageModule extends DP1{}
