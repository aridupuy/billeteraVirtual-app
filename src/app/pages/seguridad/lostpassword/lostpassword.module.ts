import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordPageRoutingModule } from './lostpassword-routing.module';

import { LostpasswordPage } from './lostpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordPageRoutingModule
  ],
  declarations: [LostpasswordPage]
})
export class LostpasswordPageModule {}
