import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPassPage } from './registro-pass.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPassPageRoutingModule {}
