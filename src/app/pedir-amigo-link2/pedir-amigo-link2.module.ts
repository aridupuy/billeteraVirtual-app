import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirAmigoLink2PageRoutingModule } from './pedir-amigo-link2-routing.module';

import { PedirAmigoLink2Page } from './pedir-amigo-link2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirAmigoLink2PageRoutingModule
  ],
  declarations: [PedirAmigoLink2Page]
})
export class PedirAmigoLink2PageModule {}
