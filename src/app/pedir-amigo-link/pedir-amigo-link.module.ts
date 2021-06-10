import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirAmigoLinkPageRoutingModule } from './pedir-amigo-link-routing.module';

import { PedirAmigoLinkPage } from './pedir-amigo-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirAmigoLinkPageRoutingModule
  ],
  declarations: [PedirAmigoLinkPage]
})
export class PedirAmigoLinkPageModule {}
