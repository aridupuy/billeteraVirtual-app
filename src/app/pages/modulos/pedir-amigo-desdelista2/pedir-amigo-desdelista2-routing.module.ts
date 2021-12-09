import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirAmigoDesdelista2Page } from './pedir-amigo-desdelista2.page';

const routes: Routes = [
  {
    path: '',
    component: PedirAmigoDesdelista2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirAmigoDesdelista2PageRoutingModule {}
