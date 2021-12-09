import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Validaridentidad1Page } from './validaridentidad1.page';

const routes: Routes = [
  {
    path: '',
    component: Validaridentidad1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Validaridentidad1PageRoutingModule {}
