import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCuentaexistenteSiPage } from './registro-cuentaexistente-si.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCuentaexistenteSiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCuentaexistenteSiPageRoutingModule {}
