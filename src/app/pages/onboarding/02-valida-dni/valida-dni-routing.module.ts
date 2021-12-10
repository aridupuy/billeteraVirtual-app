import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidaDniPage } from './valida-dni.page';

const routes: Routes = [
  {
    path: '',
    component: ValidaDniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidaDniPageRoutingModule {}
