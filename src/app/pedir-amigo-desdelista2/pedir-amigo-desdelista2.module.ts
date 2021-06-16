import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirAmigoDesdelista2PageRoutingModule } from './pedir-amigo-desdelista2-routing.module';

import { PedirAmigoDesdelista2Page } from './pedir-amigo-desdelista2.page';
import { ContactoService } from '../service/contacto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirAmigoDesdelista2PageRoutingModule
  ],
  declarations: [PedirAmigoDesdelista2Page],
  providers:[ContactoService]
})
export class PedirAmigoDesdelista2PageModule {}
