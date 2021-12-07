import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTcPageRoutingModule } from './form-tc-routing.module';

import { FormTcPage } from './form-tc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTcPageRoutingModule
  ],
  declarations: [FormTcPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class FormTcPageModule {}
