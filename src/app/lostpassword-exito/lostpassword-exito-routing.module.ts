import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpasswordExitoPage } from './lostpassword-exito.page';

const routes: Routes = [
  {
    path: '',
    component: LostpasswordExitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpasswordExitoPageRoutingModule {}
