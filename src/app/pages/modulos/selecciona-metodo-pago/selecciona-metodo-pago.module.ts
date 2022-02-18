import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionaMetodoPagoPageRoutingModule } from './selecciona-metodo-pago-routing.module';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SeleccionaMetodoPagoPage } from './selecciona-metodo-pago.page';
import { ComponentsModule } from '../../../components/components.module';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    ComponentsModule,
    SeleccionaMetodoPagoPageRoutingModule
  ],  providers:[ 
    {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG,
  },
  Location],
  declarations: [SeleccionaMetodoPagoPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SeleccionaMetodoPagoPageModule {}
