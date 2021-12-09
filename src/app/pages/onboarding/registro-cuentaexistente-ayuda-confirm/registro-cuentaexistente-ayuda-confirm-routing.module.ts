import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCuentaexistenteAyudaConfirmPage } from './registro-cuentaexistente-ayuda-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCuentaexistenteAyudaConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCuentaexistenteAyudaConfirmPageRoutingModule {}
