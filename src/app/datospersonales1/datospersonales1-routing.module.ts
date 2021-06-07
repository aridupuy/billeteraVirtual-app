import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Datospersonales1Page } from './datospersonales1.page';

const routes: Routes = [
  {
    path: '',
    component: Datospersonales1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Datospersonales1PageRoutingModule {}
