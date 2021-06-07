import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreloaderPageRoutingModule } from './preloader-routing.module';

import { PreloaderPage } from './preloader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreloaderPageRoutingModule
  ],
  declarations: [PreloaderPage]
})
export class PreloaderPageModule {}
