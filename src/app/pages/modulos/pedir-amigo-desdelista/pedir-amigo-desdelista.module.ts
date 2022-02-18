import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirAmigoDesdelistaPageRoutingModule } from './pedir-amigo-desdelista-routing.module';

import { PedirAmigoDesdelistaPage } from './pedir-amigo-desdelista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirAmigoDesdelistaPageRoutingModule
  ],
  declarations: [PedirAmigoDesdelistaPage]
})
export class PedirAmigoDesdelistaPageModule {}
