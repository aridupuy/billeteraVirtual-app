import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosTarjetaPage } from './datos-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: DatosTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosTarjetaPageRoutingModule {}
