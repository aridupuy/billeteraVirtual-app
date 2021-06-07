import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Datospersonales2Page } from './datospersonales2.page';

const routes: Routes = [
  {
    path: '',
    component: Datospersonales2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Datospersonales2PageRoutingModule {}
