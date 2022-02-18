import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiCvuPage } from './mi-cvu.page';

const routes: Routes = [
  {
    path: '',
    component: MiCvuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiCvuPageRoutingModule {}
