import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangemailPage } from './changemail.page';

const routes: Routes = [
  {
    path: '',
    component: ChangemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangemailPageRoutingModule {}
