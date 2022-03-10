import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordWebPageRoutingModule } from './lostpassword-web-routing.module';

import { LostpasswordWebPage } from './lostpassword-web.page';
import { ValidausuarioService } from '../../../service/validausuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordWebPageRoutingModule
  ],
  providers:[ValidausuarioService],
  declarations: [LostpasswordWebPage]
})
export class LostpasswordWebPageModule {}
