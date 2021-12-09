import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntaslegalesPage } from './preguntaslegales.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntaslegalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntaslegalesPageRoutingModule {}
