import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Validaridentidad2Page } from './validaridentidad2.page';

const routes: Routes = [
  {
    path: '',
    component: Validaridentidad2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Validaridentidad2PageRoutingModule {}
