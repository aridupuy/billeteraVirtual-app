import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAmigoPage } from './agregar-amigo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAmigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAmigoPageRoutingModule {}
