import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDestinatarioPageRoutingModule } from './agregar-destinatario-routing.module';

import { AgregarDestinatarioPage } from './agregar-destinatario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDestinatarioPageRoutingModule
  ],
  declarations: [AgregarDestinatarioPage]
})
export class AgregarDestinatarioPageModule {}
