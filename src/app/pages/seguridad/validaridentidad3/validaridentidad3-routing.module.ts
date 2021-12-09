import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Validaridentidad3Page } from './validaridentidad3.page';

const routes: Routes = [
  {
    path: '',
    component: Validaridentidad3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Validaridentidad3PageRoutingModule {}
