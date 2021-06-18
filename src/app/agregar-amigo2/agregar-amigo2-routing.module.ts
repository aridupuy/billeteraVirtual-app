import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAmigo2Page } from './agregar-amigo2.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAmigo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAmigo2PageRoutingModule {}
