import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidaridentidadPage } from './validaridentidad.page';

const routes: Routes = [
  {
    path: '',
    component: ValidaridentidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidaridentidadPageRoutingModule {}
