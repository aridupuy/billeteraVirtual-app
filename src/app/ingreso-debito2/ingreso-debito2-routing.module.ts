import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoDebito2Page } from './ingreso-debito2.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoDebito2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoDebito2PageRoutingModule {}
