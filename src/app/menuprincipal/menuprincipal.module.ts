import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuprincipalPageRoutingModule } from './menuprincipal-routing.module';

import { MenuprincipalPage } from './menuprincipal.page';
import { UsuarioService } from '../service/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuprincipalPageRoutingModule
  ],
  providers:[UsuarioService],
  declarations: [MenuprincipalPage]
})
export class MenuprincipalPageModule {}
