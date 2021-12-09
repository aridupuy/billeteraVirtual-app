import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTcPage } from './form-tc.page';

const routes: Routes = [
  {
    path: '',
    component: FormTcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTcPageRoutingModule {}
