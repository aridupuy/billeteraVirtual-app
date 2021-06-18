import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetirarDineroPageRoutingModule } from './retirar-dinero-routing.module';

import { RetirarDineroPage } from './retirar-dinero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetirarDineroPageRoutingModule
  ],
  declarations: [RetirarDineroPage]
})
export class RetirarDineroPageModule {}
