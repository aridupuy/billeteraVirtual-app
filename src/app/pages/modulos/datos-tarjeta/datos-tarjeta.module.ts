import { ComponentsModule } from '../../../components/components.module';
import { CargandoComponent } from '../../../components/cargando/cargando.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosTarjetaPageRoutingModule } from './datos-tarjeta-routing.module';

import { DatosTarjetaPage } from './datos-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DatosTarjetaPageRoutingModule
  ],
  declarations: [DatosTarjetaPage]
})
export class DatosTarjetaPageModule {}
