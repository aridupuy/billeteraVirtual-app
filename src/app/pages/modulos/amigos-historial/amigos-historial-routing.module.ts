import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmigosHistorialPage } from './amigos-historial.page';

const routes: Routes = [
  {
    path: '',
    component: AmigosHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmigosHistorialPageRoutingModule {}
