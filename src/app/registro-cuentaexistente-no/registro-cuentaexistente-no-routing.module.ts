import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCuentaexistenteNoPage } from './registro-cuentaexistente-no.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCuentaexistenteNoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCuentaexistenteNoPageRoutingModule {}
