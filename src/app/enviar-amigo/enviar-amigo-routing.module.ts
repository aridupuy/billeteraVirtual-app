import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviarAmigoPage } from './enviar-amigo.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarAmigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviarAmigoPageRoutingModule {}
