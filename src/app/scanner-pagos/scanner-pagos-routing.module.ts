import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerPagosPage } from './scanner-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerPagosPageRoutingModule {}
