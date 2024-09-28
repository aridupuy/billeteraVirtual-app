import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordexitoWebPage } from './lostpasswordexito-web.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordexitoWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordexitoWebPageRoutingModule {}
