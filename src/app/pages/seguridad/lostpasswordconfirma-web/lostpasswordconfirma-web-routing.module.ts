import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordconfirmaWebPage } from './lostpasswordconfirma-web.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordconfirmaWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordconfirmaWebPageRoutingModule {}
