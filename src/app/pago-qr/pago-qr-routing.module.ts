import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoQrPage } from './pago-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PagoQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoQrPageRoutingModule {}
