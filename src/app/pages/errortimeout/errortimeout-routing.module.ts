import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrortimeoutPage } from './errortimeout.page';

const routes: Routes = [
  {
    path: '',
    component: ErrortimeoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrortimeoutPageRoutingModule {}
