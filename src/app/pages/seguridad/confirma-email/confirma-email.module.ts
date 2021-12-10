import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmaEmailPageRoutingModule } from './confirma-email-routing.module';


import { CountdownModule } from 'ngx-countdown';
import { ConfirmaEmailPage } from './confirma-email.page';
import { ValidacionMailService } from '../../../service/validacion-mail.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmaEmailPageRoutingModule,
    CountdownModule

  ],
  declarations: [ConfirmaEmailPage],
  providers:[ValidacionMailService]
})
export class ConfirmaEmailPageModule {}
