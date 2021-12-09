import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Validaridentidad4Page } from './validaridentidad4.page';

const routes: Routes = [
  {
    path: '',
    component: Validaridentidad4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Validaridentidad4PageRoutingModule {}
