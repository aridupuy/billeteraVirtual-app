import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoDineroPage } from './ingreso-dinero.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoDineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoDineroPageRoutingModule {}
