import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarfotosPage } from './revisarfotos.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarfotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarfotosPageRoutingModule {}
