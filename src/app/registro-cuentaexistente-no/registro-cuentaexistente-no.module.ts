import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteNoPageRoutingModule } from './registro-cuentaexistente-no-routing.module';

import { RegistroCuentaexistenteNoPage } from './registro-cuentaexistente-no.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCuentaexistenteNoPageRoutingModule
  ],
  declarations: [RegistroCuentaexistenteNoPage]
})
export class RegistroCuentaexistenteNoPageModule {}
