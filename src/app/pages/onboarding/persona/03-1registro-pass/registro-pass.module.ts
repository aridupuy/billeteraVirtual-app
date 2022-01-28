import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPassPageRoutingModule } from './registro-pass-routing.module';

import { RegistroPassPage } from './registro-pass.page';
import { ValidausuarioService } from '../../../../service/validausuario.service';
import { InicioProcesoService } from '../../../../service/inicio-proceso.service';
import { LoginBoService } from '../../../../service/login-bo.service';
import { ValidacionMailService } from '../../../../service/validacion-mail.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPassPageRoutingModule
  ],
  declarations: [RegistroPassPage],
  providers:[LoginBoService,InicioProcesoService,ValidacionMailService,ValidausuarioService]

})
export class RegistroPassPageModule {}
