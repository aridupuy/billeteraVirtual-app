import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisTcPage } from './mis-tc.page';

const routes: Routes = [
  {
    path: '',
    component: MisTcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisTcPageRoutingModule {}
