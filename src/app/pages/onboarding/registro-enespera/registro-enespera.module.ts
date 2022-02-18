import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEnesperaPageRoutingModule } from './registro-enespera-routing.module';

import { RegistroEnesperaPage } from './registro-enespera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEnesperaPageRoutingModule
  ],
  declarations: [RegistroEnesperaPage]
})
export class RegistroEnesperaPageModule {}
