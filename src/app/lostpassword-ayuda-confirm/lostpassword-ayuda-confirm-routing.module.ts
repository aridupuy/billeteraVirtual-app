import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordAyudaConfirmPage } from './lostpassword-ayuda-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordAyudaConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordAyudaConfirmPageRoutingModule {}
