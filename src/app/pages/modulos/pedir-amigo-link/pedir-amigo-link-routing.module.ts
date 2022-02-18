import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirAmigoLinkPage } from './pedir-amigo-link.page';

const routes: Routes = [
  {
    path: '',
    component: PedirAmigoLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirAmigoLinkPageRoutingModule {}
