import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCuentaexistentePage } from './registro-cuentaexistente.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCuentaexistentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCuentaexistentePageRoutingModule {}
