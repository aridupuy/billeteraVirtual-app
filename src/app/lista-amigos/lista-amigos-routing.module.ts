import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAmigosPage } from './lista-amigos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAmigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAmigosPageRoutingModule {}
