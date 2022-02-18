import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPermisoPage } from './usuarios-permiso.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPermisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPermisoPageRoutingModule {}
