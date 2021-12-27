import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarCelPage } from './modificar-cel.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarCelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarCelPageRoutingModule {}
