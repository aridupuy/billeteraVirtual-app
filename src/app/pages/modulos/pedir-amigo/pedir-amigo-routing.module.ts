import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirAmigoPage } from './pedir-amigo.page';

const routes: Routes = [
  {
    path: '',
    component: PedirAmigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirAmigoPageRoutingModule {}
