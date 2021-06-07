import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmigosPage } from './amigos.page';

const routes: Routes = [
  {
    path: '',
    component: AmigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmigosPageRoutingModule {}
