import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordexitoWebPageRoutingModule } from './lostpasswordexito-web-routing.module';

import { LostpasswordexitoWebPage } from './lostpasswordexito-web.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordexitoWebPageRoutingModule
  ],
  declarations: [LostpasswordexitoWebPage]
})
export class LostpasswordexitoWebPageModule {}
