import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetirarDineroPage } from './retirar-dinero.page';

const routes: Routes = [
  {
    path: '',
    component: RetirarDineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetirarDineroPageRoutingModule {}
