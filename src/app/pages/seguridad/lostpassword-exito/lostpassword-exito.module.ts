import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordExitoPageRoutingModule } from './lostpassword-exito-routing.module';

import { LostpasswordExitoPage } from './lostpassword-exito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordExitoPageRoutingModule
  ],
  declarations: [LostpasswordExitoPage]
})
export class LostpasswordExitoPageModule {}
