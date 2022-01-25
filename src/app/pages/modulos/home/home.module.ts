import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LoginService } from '../../../service/login.service';
import { ServiceService } from '../../../service/service.service';
import { UsuarioService } from '../../../service/usuario.service';
import { TransaccionesService } from '../../../service/transacciones.service';
import { ValidacionMailService } from '../../../service/validacion-mail.service';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { LogoutComponent } from '../../../components/logout/logout.component';
import { ComponentsModule } from '../../../components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  providers:[LoginService,UsuarioService,TransaccionesService,Clipboard,ValidacionMailService],
  declarations: [HomePage]
  ,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
