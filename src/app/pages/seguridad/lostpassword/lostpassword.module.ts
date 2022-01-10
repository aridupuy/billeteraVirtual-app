import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpasswordPageRoutingModule } from './lostpassword-routing.module';

import { LostpasswordPage } from './lostpassword.page';
import { ValidausuarioService } from '../../../service/validausuario.service';
import { LoginBoService } from '../../../service/login-bo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpasswordPageRoutingModule
  ],
  declarations: [LostpasswordPage],
  providers:[ValidausuarioService,LoginBoService]
})
export class LostpasswordPageModule {}
