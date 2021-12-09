import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidaridentidadProblemaPage } from './validaridentidad-problema.page';

const routes: Routes = [
  {
    path: '',
    component: ValidaridentidadProblemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidaridentidadProblemaPageRoutingModule {}
