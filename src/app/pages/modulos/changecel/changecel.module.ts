import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangecelPageRoutingModule } from './changecel-routing.module';

import { ChangecelPage } from './changecel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangecelPageRoutingModule
  ],
  declarations: [ChangecelPage]
})
export class ChangecelPageModule {}
