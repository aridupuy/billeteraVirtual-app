import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoTransferenciaPage } from './ingreso-transferencia.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoTransferenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoTransferenciaPageRoutingModule {}
