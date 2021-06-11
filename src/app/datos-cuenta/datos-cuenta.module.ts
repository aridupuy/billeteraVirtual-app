import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosCuentaPageRoutingModule } from './datos-cuenta-routing.module';

import { DatosCuentaPage } from './datos-cuenta.page';
import { UsuarioService } from '../service/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosCuentaPageRoutingModule
  ],
  providers:[UsuarioService],
  declarations: [DatosCuentaPage]
})
export class DatosCuentaPageModule {}
