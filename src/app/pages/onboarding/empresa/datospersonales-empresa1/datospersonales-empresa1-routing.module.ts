import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatospersonalesEmpresa1Page } from './datospersonales-empresa1.page';

const routes: Routes = [
  {
    path: '',
    component: DatospersonalesEmpresa1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatospersonalesEmpresa1PageRoutingModule {}
