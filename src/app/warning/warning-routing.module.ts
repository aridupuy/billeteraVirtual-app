import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarningPage } from './warning.page';

const routes: Routes = [
  {
    path: '',
    component: WarningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarningPageRoutingModule {}
