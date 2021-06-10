import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirAmigoLink2Page } from './pedir-amigo-link2.page';

const routes: Routes = [
  {
    path: '',
    component: PedirAmigoLink2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirAmigoLink2PageRoutingModule {}
