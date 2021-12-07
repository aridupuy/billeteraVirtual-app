import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacionesPage } from './confirmaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmacionesPageRoutingModule {}
