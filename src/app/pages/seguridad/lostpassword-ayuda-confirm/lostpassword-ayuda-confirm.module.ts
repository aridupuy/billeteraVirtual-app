import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordAyudaConfirmPageRoutingModule } from './lostpassword-ayuda-confirm-routing.module';

import { LostpasswordAyudaConfirmPage } from './lostpassword-ayuda-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordAyudaConfirmPageRoutingModule
  ],
  declarations: [LostpasswordAyudaConfirmPage]
})
export class LostpasswordAyudaConfirmPageModule {}
