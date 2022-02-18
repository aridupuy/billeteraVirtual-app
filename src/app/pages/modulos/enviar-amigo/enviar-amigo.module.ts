import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarAmigoPageRoutingModule } from './enviar-amigo-routing.module';

import { EnviarAmigoPage } from './enviar-amigo.page';
// import { Contacts } from '@ionic-native/contacts/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarAmigoPageRoutingModule
  ],
  declarations: [EnviarAmigoPage],
  
})
export class EnviarAmigoPageModule {}
