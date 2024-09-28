import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeFirstPageRoutingModule } from './home-first-routing.module';

import { HomeFirstPage } from './home-first.page';
import { SplashComponent } from '../../../components/splash/splash.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeFirstPageRoutingModule,
    
  ],
  declarations: [HomeFirstPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeFirstPageModule {}
