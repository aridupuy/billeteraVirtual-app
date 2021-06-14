import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirAmigoDesdelistaPage } from './pedir-amigo-desdelista.page';

const routes: Routes = [
  {
    path: '',
    component: PedirAmigoDesdelistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirAmigoDesdelistaPageRoutingModule {}
