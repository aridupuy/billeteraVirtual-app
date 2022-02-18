import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAmigoPageRoutingModule } from './agregar-amigo-routing.module';

import { AgregarAmigoPage } from './agregar-amigo.page';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAmigoPageRoutingModule
  ],
  providers:[Contacts],
  declarations: [AgregarAmigoPage]
})
export class AgregarAmigoPageModule {}
