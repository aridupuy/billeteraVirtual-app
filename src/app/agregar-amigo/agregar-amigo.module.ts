import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAmigoPageRoutingModule } from './agregar-amigo-routing.module';

import { AgregarAmigoPage } from './agregar-amigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAmigoPageRoutingModule
  ],
  declarations: [AgregarAmigoPage]
})
export class AgregarAmigoPageModule {}
