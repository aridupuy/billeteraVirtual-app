import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresaPinConfirmaPage } from './ingresa-pin-confirma.page';

const routes: Routes = [
  {
    path: '',
    component: IngresaPinConfirmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresaPinConfirmaPageRoutingModule {}
