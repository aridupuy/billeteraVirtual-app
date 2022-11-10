import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const lastLog = console.log;
const lastError = console.error;
const lastWarning = console.warn;
if (environment.production) {
  enableProdMode();
  console.log=function($msj){
    if(!environment.production)
        lastLog($msj);
    }
    console.error=function($msj){
      if(!environment.production)
        lastError($msj);
    }
    console.warn=function($msj){
      if(!environment.production)
        lastWarning($msj);
    }
}

// 

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

