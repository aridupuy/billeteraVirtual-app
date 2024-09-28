import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordWebPage } from './lostpassword-web.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordWebPageRoutingModule {}
