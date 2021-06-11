import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaLinksPage } from './agenda-links.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaLinksPageRoutingModule {}
