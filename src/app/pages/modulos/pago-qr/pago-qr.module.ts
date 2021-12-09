import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { IonicModule } from '@ionic/angular';

import { PagoQrPageRoutingModule } from './pago-qr-routing.module';

import { PagoQrPage } from './pago-qr.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PagoQrPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    
    FormsModule,
  ],
  declarations: [PagoQrPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[BarcodeScanner]
})
export class PagoQrPageModule {}
