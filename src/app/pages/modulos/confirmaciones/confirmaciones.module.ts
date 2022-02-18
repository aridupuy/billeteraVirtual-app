import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionesPageRoutingModule } from './confirmaciones-routing.module';

import { ConfirmacionesPage } from './confirmaciones.page';
import { LogoutComponent } from '../../../components/logout/logout.component';
import { ComponentsModule } from '../../../components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConfirmacionesPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfirmacionesPageModule {}
