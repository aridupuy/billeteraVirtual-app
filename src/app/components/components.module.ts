import { RespuestaResultadoComponent } from './respuesta-resultado/respuesta-resultado.component';
import { IonicModule } from '@ionic/angular';
import { CargandoComponent } from './cargando/cargando.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [CargandoComponent,RespuestaResultadoComponent],
  exports: [CargandoComponent,RespuestaResultadoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
  
}
