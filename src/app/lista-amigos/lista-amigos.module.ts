import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

import { IonicModule } from '@ionic/angular';

import { ListaAmigosPageRoutingModule } from './lista-amigos-routing.module';

import { ListaAmigosPage } from './lista-amigos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAmigosPageRoutingModule
  ],
  declarations: [ListaAmigosPage],
  providers:[Contacts]
})
export class ListaAmigosPageModule {}
