import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionaMetodoPagoPage } from './selecciona-metodo-pago.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionaMetodoPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionaMetodoPagoPageRoutingModule {}
