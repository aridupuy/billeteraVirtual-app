import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangemailPageRoutingModule } from './changemail-routing.module';

import { ChangemailPage } from './changemail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangemailPageRoutingModule
  ],
  declarations: [ChangemailPage]
})
export class ChangemailPageModule {}
