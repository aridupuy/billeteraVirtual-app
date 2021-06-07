import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteAyudaPageRoutingModule } from './registro-cuentaexistente-ayuda-routing.module';

import { RegistroCuentaexistenteAyudaPage } from './registro-cuentaexistente-ayuda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCuentaexistenteAyudaPageRoutingModule
  ],
  declarations: [RegistroCuentaexistenteAyudaPage]
})
export class RegistroCuentaexistenteAyudaPageModule {}
