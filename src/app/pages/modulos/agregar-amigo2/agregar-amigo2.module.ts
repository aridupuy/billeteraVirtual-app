import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAmigo2PageRoutingModule } from './agregar-amigo2-routing.module';

import { AgregarAmigo2Page } from './agregar-amigo2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAmigo2PageRoutingModule
  ],
  declarations: [AgregarAmigo2Page]
})
export class AgregarAmigo2PageModule {}
