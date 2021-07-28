import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAmigosEnvPage } from './lista-amigos-env.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAmigosEnvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAmigosEnvPageRoutingModule {}
