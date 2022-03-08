import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotedetransferenciaPage } from './lotedetransferencia.page';

const routes: Routes = [
  {
    path: '',
    component: LotedetransferenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotedetransferenciaPageRoutingModule {}
