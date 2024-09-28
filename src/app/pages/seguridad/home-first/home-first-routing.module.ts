import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeFirstPage } from './home-first.page';

const routes: Routes = [
  {
    path: '',
    component: HomeFirstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeFirstPageRoutingModule {}
