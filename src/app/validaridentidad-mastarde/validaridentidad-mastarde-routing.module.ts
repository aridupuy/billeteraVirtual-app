import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidaridentidadMastardePage } from './validaridentidad-mastarde.page';

const routes: Routes = [
  {
    path: '',
    component: ValidaridentidadMastardePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidaridentidadMastardePageRoutingModule {}
