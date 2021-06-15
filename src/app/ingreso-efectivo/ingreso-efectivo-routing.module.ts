import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoEfectivoPage } from './ingreso-efectivo.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoEfectivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoEfectivoPageRoutingModule {}
