import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmasmsPage } from './confirmasms.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmasmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmasmsPageRoutingModule {}
