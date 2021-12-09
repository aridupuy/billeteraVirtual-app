import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteSiPageRoutingModule } from './registro-cuentaexistente-si-routing.module';

import { RegistroCuentaexistenteSiPage } from './registro-cuentaexistente-si.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCuentaexistenteSiPageRoutingModule
  ],
  declarations: [RegistroCuentaexistenteSiPage]
})
export class RegistroCuentaexistenteSiPageModule {}
