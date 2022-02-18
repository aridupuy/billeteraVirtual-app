import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosCuentaPage } from './datos-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: DatosCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosCuentaPageRoutingModule {}
