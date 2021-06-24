import { RespuestaResultadoComponent } from './respuesta-resultado/respuesta-resultado.component';
import { IonicModule } from '@ionic/angular';
import { CargandoComponent } from './cargando/cargando.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
@NgModule({
  declarations: [CargandoComponent,RespuestaResultadoComponent,PreloaderComponent],
  exports: [CargandoComponent,RespuestaResultadoComponent,PreloaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
  
}
