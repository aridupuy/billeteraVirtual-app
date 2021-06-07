import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordConfirmaPage } from './lostpassword-confirma.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordConfirmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordConfirmaPageRoutingModule {}
