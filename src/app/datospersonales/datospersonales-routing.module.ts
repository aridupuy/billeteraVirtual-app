import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatospersonalesPage } from './datospersonales.page';

const routes: Routes = [
  {
    path: '',
    component: DatospersonalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatospersonalesPageRoutingModule {}
