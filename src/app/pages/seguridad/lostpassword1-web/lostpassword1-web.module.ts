import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Lostpassword1WebPageRoutingModule } from './lostpassword1-web-routing.module';

import { Lostpassword1WebPage } from './lostpassword1-web.page';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Lostpassword1WebPageRoutingModule,CountdownModule
  ],
  declarations: [Lostpassword1WebPage]
})
export class Lostpassword1WebPageModule {}
