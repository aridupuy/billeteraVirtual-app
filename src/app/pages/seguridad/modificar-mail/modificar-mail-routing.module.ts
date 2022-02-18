import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarMailPage } from './modificar-mail.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarMailPageRoutingModule {}
