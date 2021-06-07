import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordConfirmaPageRoutingModule } from './lostpassword-confirma-routing.module';

import { LostpasswordConfirmaPage } from './lostpassword-confirma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordConfirmaPageRoutingModule
  ],
  declarations: [LostpasswordConfirmaPage]
})
export class LostpasswordConfirmaPageModule {}
