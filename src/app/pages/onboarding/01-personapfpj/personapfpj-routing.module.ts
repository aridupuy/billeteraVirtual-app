import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonapfpjPage } from './personapfpj.page';

const routes: Routes = [
  {
    path: '',
    component: PersonapfpjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonapfpjPageRoutingModule {}
