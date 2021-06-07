import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCuentaexistenteAyudaPage } from './registro-cuentaexistente-ayuda.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCuentaexistenteAyudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCuentaexistenteAyudaPageRoutingModule {}
