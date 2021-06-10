import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAmigosPageRoutingModule } from './lista-amigos-routing.module';

import { ListaAmigosPage } from './lista-amigos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAmigosPageRoutingModule
  ],
  declarations: [ListaAmigosPage]
})
export class ListaAmigosPageModule {}
