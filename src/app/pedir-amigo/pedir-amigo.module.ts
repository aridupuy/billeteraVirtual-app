import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirAmigoPageRoutingModule } from './pedir-amigo-routing.module';

import { PedirAmigoPage } from './pedir-amigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirAmigoPageRoutingModule
  ],
  declarations: [PedirAmigoPage]
})
export class PedirAmigoPageModule {}
