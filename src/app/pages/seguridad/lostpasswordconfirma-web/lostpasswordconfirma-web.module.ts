import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordconfirmaWebPageRoutingModule } from './lostpasswordconfirma-web-routing.module';

import { LostpasswordconfirmaWebPage } from './lostpasswordconfirma-web.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordconfirmaWebPageRoutingModule
  ],
  declarations: [LostpasswordconfirmaWebPage]
})
export class LostpasswordconfirmaWebPageModule {}
