import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngreoTransferenciaPage } from './ingreo-transferencia.page';

const routes: Routes = [
  {
    path: '',
    component: IngreoTransferenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngreoTransferenciaPageRoutingModule {}
