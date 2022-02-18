import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciaConfirmaPageRoutingModule } from './transferencia-confirma-routing.module';

import { TransferenciaConfirmaPage } from './transferencia-confirma.page';
import { TransferirProveedorService } from '../../../service/transferir-proveedor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciaConfirmaPageRoutingModule
  ],
  providers:[TransferirProveedorService],
  declarations: [TransferenciaConfirmaPage]
})
export class TransferenciaConfirmaPageModule {}
