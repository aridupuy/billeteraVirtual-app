import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferenciaMontoPage } from './transferencia-monto.page';

const routes: Routes = [
  {
    path: '',
    component: TransferenciaMontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferenciaMontoPageRoutingModule {}
