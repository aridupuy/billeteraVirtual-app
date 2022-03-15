import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrortimeoutPageRoutingModule } from './errortimeout-routing.module';

import { ErrortimeoutPage } from './errortimeout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrortimeoutPageRoutingModule
  ],
  declarations: [ErrortimeoutPage]
})
export class ErrortimeoutPageModule {}
