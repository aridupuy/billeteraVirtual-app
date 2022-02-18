import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesodenegadoPage } from './accesodenegado.page';

const routes: Routes = [
  {
    path: '',
    component: AccesodenegadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesodenegadoPageRoutingModule {}
