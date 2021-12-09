import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordAyudaPage } from './lostpassword-ayuda.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordAyudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordAyudaPageRoutingModule {}
