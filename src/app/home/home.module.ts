import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LoginService } from '../service/login.service';
import { ServiceService } from '../service/service.service';
import { UsuarioService } from '../service/usuario.service';
import { TransaccionesService } from '../service/transacciones.service';

import { Clipboard } from '@ionic-native/clipboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers:[LoginService,UsuarioService,TransaccionesService,Clipboard],
  declarations: [HomePage]
})
export class HomePageModule {}
