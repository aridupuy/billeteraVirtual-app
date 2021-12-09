import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirAmigoLink3Page } from './pedir-amigo-link3.page';

const routes: Routes = [
  {
    path: '',
    component: PedirAmigoLink3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirAmigoLink3PageRoutingModule {}
