import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordAyudaPageRoutingModule } from './lostpassword-ayuda-routing.module';

import { LostpasswordAyudaPage } from './lostpassword-ayuda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordAyudaPageRoutingModule
  ],
  declarations: [LostpasswordAyudaPage]
})
export class LostpasswordAyudaPageModule {}
