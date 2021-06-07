import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistentePageRoutingModule } from './registro-cuentaexistente-routing.module';

import { RegistroCuentaexistentePage } from './registro-cuentaexistente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCuentaexistentePageRoutingModule
  ],
  declarations: [RegistroCuentaexistentePage]
})
export class RegistroCuentaexistentePageModule {}
