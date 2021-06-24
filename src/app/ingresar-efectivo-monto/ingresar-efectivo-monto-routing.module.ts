import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarEfectivoMontoPage } from './ingresar-efectivo-monto.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarEfectivoMontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarEfectivoMontoPageRoutingModule {}
