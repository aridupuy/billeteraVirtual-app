import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { LoginBoService } from '../service/login-bo.service';
import { InicioProcesoService } from '../service/inicio-proceso.service';
import { ValidacionMailService } from '../service/validacion-mail.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule
  ],
  declarations: [RegistroPage],
  providers:[LoginBoService,InicioProcesoService,ValidacionMailService]
})
export class RegistroPageModule {}
