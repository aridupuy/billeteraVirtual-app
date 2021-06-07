import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordPage } from './lostpassword.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordPageRoutingModule {}
