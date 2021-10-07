import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarCuentaPage } from './cambiar-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarCuentaPageRoutingModule {}
