import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetiroTransferenciaPage } from './retiro-transferencia.page';

const routes: Routes = [
  {
    path: '',
    component: RetiroTransferenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetiroTransferenciaPageRoutingModule {}
