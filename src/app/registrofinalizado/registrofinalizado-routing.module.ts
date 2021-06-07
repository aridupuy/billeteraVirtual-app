import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrofinalizadoPage } from './registrofinalizado.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrofinalizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrofinalizadoPageRoutingModule {}
