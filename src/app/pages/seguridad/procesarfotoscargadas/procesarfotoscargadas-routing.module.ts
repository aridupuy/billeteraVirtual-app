import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesarfotoscargadasPage } from './procesarfotoscargadas.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesarfotoscargadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesarfotoscargadasPageRoutingModule {}
