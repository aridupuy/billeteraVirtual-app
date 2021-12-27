import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmapaswwordPageRoutingModule } from './confirmapaswword-routing.module';

import { ConfirmapaswwordPage } from './confirmapaswword.page';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmapaswwordPageRoutingModule,CountdownModule
  ],
  declarations: [ConfirmapaswwordPage]
})
export class ConfirmapaswwordPageModule {}
