import { RespuestaResultadoComponent } from './respuesta-resultado/respuesta-resultado.component';
import { IonicModule } from '@ionic/angular';
import { CargandoComponent } from './cargando/cargando.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { SuccessPage } from '../success/success.page';
import { ErrorPage } from '../error/error.page';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
@NgModule({
  declarations: [CargandoComponent,RespuestaResultadoComponent,PreloaderComponent,ErrorComponent,SuccessComponent],
  exports: [CargandoComponent,RespuestaResultadoComponent,PreloaderComponent,SuccessComponent,ErrorComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  providers:[
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
  
}
