import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarningPageRoutingModule } from './warning-routing.module';

import { WarningPage } from './warning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarningPageRoutingModule
  ],
  declarations: [WarningPage]
})
export class WarningPageModule {}
