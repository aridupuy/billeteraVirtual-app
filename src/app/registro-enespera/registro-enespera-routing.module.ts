import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEnesperaPage } from './registro-enespera.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEnesperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEnesperaPageRoutingModule {}
