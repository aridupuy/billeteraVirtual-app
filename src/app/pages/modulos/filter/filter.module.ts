import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterPageRoutingModule } from './filter-routing.module';

import { FilterPage } from './filter.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    Component
],
  declarations: [FilterPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterPageModule {}
