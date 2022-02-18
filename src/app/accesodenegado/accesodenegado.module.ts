import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesodenegadoPageRoutingModule } from './accesodenegado-routing.module';

import { AccesodenegadoPage } from './accesodenegado.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesodenegadoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AccesodenegadoPage]
})
export class AccesodenegadoPageModule {}
