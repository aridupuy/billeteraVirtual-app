import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Lostpassword1WebPage } from './lostpassword1-web.page';

const routes: Routes = [
  {
    path: '',
    component: Lostpassword1WebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Lostpassword1WebPageRoutingModule {}
