import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarPageRoutingModule } from './pagar-routing.module';


import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { ComponentsModule } from '../../../components/components.module';
import {
    RespuestaResultadoComponent
} from '../../../components/respuesta-resultado/respuesta-resultado.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PagarPage } from './pagar.page';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarPageRoutingModule,
    SwiperModule,
    ComponentsModule,
  ],
  providers:[ 
    {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG,
  },
  Location],
  declarations: [PagarPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PagarPageModule {}
