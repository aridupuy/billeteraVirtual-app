import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteAyudaConfirmPageRoutingModule } from './registro-cuentaexistente-ayuda-confirm-routing.module';

import { RegistroCuentaexistenteAyudaConfirmPage } from './registro-cuentaexistente-ayuda-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCuentaexistenteAyudaConfirmPageRoutingModule
  ],
  declarations: [RegistroCuentaexistenteAyudaConfirmPage]
})
export class RegistroCuentaexistenteAyudaConfirmPageModule {}
