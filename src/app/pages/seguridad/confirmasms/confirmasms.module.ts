import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmasmsPageRoutingModule } from './confirmasms-routing.module';

import { ConfirmasmsPage } from './confirmasms.page';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmasmsPageRoutingModule,CountdownModule
  ],
  declarations: [ConfirmasmsPage]
})
export class ConfirmasmsPageModule {}
