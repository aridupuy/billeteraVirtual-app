import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangecelPage } from './changecel.page';

const routes: Routes = [
  {
    path: '',
    component: ChangecelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangecelPageRoutingModule {}
