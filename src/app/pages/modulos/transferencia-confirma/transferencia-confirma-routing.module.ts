import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferenciaConfirmaPage } from './transferencia-confirma.page';

const routes: Routes = [
  {
    path: '',
    component: TransferenciaConfirmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferenciaConfirmaPageRoutingModule {}
