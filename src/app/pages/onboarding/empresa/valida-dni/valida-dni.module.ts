import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidaDniPageRoutingModule } from './valida-dni-routing.module';

import { ValidaDniPage } from './valida-dni.page';
import { ValidaDniPageModule as VD} from '../../persona/02-valida-dni/valida-dni.module';
import { ValidausuarioService } from '../../../../service/validausuario.service';
import { InicioProcesoService } from '../../../../service/inicio-proceso.service';
import { LoginBoService } from '../../../../service/login-bo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidaDniPageRoutingModule
  ],
  declarations: [ValidaDniPage],
  providers:[LoginBoService,InicioProcesoService,ValidausuarioService]

})
export class ValidaDniPageModule extends VD{}
