import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonapfpjPageRoutingModule } from './personapfpj-routing.module';

import { PersonapfpjPage } from './personapfpj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonapfpjPageRoutingModule
  ],
  declarations: [PersonapfpjPage]
})
export class PersonapfpjPageModule {}
