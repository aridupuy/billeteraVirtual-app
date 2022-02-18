import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesarfotosPage } from './procesarfotos.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesarfotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesarfotosPageRoutingModule {}
