import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresopatronPage } from './ingresopatron.page';

const routes: Routes = [
  {
    path: '',
    component: IngresopatronPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresopatronPageRoutingModule {}
