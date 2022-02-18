import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprobantePage } from './comprobante.page';

const routes: Routes = [
  {
    path: '',
    component: ComprobantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprobantePageRoutingModule {}
