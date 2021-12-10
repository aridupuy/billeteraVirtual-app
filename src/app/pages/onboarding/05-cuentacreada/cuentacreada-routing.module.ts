import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentacreadaPage } from './cuentacreada.page';

const routes: Routes = [
  {
    path: '',
    component: CuentacreadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentacreadaPageRoutingModule {}
