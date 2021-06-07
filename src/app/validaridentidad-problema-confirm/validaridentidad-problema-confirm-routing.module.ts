import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidaridentidadProblemaConfirmPage } from './validaridentidad-problema-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ValidaridentidadProblemaConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidaridentidadProblemaConfirmPageRoutingModule {}
