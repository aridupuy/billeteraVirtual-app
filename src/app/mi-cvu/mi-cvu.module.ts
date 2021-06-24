import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCvuPageRoutingModule } from './mi-cvu-routing.module';

import { MiCvuPage } from './mi-cvu.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiCvuPageRoutingModule
  ],
  providers:[Clipboard],
  declarations: [MiCvuPage]
})
export class MiCvuPageModule {}
