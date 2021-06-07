import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreloaderPage } from './preloader.page';

const routes: Routes = [
  {
    path: '',
    component: PreloaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreloaderPageRoutingModule {}
