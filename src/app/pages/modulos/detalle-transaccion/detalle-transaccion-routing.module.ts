import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTransaccionPage } from './detalle-transaccion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTransaccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTransaccionPageRoutingModule {}
