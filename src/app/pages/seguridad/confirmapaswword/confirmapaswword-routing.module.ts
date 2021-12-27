import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmapaswwordPage } from './confirmapaswword.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmapaswwordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmapaswwordPageRoutingModule {}
