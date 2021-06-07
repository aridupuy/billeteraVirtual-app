import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Registro1Page } from './registro1.page';

const routes: Routes = [
  {
    path: '',
    component: Registro1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Registro1PageRoutingModule {}
