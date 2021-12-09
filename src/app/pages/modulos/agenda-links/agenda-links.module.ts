import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaLinksPageRoutingModule } from './agenda-links-routing.module';

import { AgendaLinksPage } from './agenda-links.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaLinksPageRoutingModule
  ],
  declarations: [AgendaLinksPage]
})
export class AgendaLinksPageModule {}
