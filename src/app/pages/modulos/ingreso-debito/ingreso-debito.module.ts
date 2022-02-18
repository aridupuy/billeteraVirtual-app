import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoDebitoPageRoutingModule } from './ingreso-debito-routing.module';

import { IngresoDebitoPage } from './ingreso-debito.page';
import { UsuarioService } from '../../../service/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoDebitoPageRoutingModule
  ],
  declarations: [IngresoDebitoPage]
  ,providers:[UsuarioService]
})
export class IngresoDebitoPageModule {}
