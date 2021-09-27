import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarcuentaPage } from './cambiarcuenta.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarcuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarcuentaPageRoutingModule {}
