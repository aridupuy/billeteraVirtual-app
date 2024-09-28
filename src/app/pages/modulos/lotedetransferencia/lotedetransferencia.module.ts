import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotedetransferenciaPageRoutingModule } from './lotedetransferencia-routing.module';

import { LotedetransferenciaPage } from './lotedetransferencia.page';
import { TransferirProveedorService } from '../../../service/transferir-proveedor.service';
import { DestinatariosService } from '../../../service/destinatarios.service';
import { NuevoDestinatarioService } from '../../../service/nuevo-destinatario.service';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotedetransferenciaPageRoutingModule
  ],
  providers:[TransferirProveedorService,DestinatariosService,NuevoDestinatarioService,AlertController],
  declarations: [LotedetransferenciaPage]
})
export class LotedetransferenciaPageModule {}
