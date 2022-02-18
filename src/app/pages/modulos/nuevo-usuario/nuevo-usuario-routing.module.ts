import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoUsuarioPage } from './nuevo-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoUsuarioPageRoutingModule {}
