import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPagosPageRoutingModule } from './scanner-pagos-routing.module';

import { ScannerPagosPage } from './scanner-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPagosPageRoutingModule
  ],
  declarations: [ScannerPagosPage],
  providers:[BarcodeScanner]
})
export class ScannerPagosPageModule {}
