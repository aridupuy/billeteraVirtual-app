import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferenciaNuevacuentaPage } from './transferencia-nuevacuenta.page';

const routes: Routes = [
  {
    path: '',
    component: TransferenciaNuevacuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferenciaNuevacuentaPageRoutingModule {}
