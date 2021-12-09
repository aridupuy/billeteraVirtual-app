import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasPopupPage } from './preguntas-popup.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasPopupPageRoutingModule {}
