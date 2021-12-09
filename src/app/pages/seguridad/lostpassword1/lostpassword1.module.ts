import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Lostpassword1PageRoutingModule } from './lostpassword1-routing.module';

import { Lostpassword1Page } from './lostpassword1.page';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Lostpassword1PageRoutingModule,CountdownModule
  ],
  declarations: [Lostpassword1Page]
})
export class Lostpassword1PageModule {}
