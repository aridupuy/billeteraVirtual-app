import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDestinatariosPageRoutingModule } from './lista-destinatarios-routing.module';

import { ListaDestinatariosPage } from './lista-destinatarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDestinatariosPageRoutingModule
  ],
  declarations: [ListaDestinatariosPage]
})
export class ListaDestinatariosPageModule {}
