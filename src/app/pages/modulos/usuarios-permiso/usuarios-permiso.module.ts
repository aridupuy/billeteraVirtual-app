import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPermisoPageRoutingModule } from './usuarios-permiso-routing.module';

import { UsuariosPermisoPage } from './usuarios-permiso.page';
import { UssersService } from '../../../service/ussers.service';
import { NavParams } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPermisoPageRoutingModule
  ],
  providers:[NavParams,UssersService],
  declarations: [UsuariosPermisoPage]
})
export class UsuariosPermisoPageModule {}
