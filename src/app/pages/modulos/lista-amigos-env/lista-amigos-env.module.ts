import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAmigosEnvPageRoutingModule } from './lista-amigos-env-routing.module';

import { ListaAmigosEnvPage } from './lista-amigos-env.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAmigosEnvPageRoutingModule
  ],
  declarations: [ListaAmigosEnvPage]
})
export class ListaAmigosEnvPageModule {}
