import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoDebitoPage } from './ingreso-debito.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoDebitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoDebitoPageRoutingModule {}
