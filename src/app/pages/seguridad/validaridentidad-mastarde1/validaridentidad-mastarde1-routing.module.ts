import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidaridentidadMastarde1Page } from './validaridentidad-mastarde1.page';

const routes: Routes = [
  {
    path: '',
    component: ValidaridentidadMastarde1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidaridentidadMastarde1PageRoutingModule {}
