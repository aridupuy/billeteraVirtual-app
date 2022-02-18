import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirAmigoLink3PageRoutingModule } from './pedir-amigo-link3-routing.module';

import { PedirAmigoLink3Page } from './pedir-amigo-link3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirAmigoLink3PageRoutingModule
  ],
  declarations: [PedirAmigoLink3Page]
})
export class PedirAmigoLink3PageModule {}
