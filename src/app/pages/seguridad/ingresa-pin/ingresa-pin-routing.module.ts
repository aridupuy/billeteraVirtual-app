import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresaPinPage } from './ingresa-pin.page';

const routes: Routes = [
  {
    path: '',
    component: IngresaPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresaPinPageRoutingModule {}
