import { Platform } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  // URL: "https://efectivodigital.com.ar/",
  URL: "https://efectivodigital.com.ar/",
  URL_DESARROLLO: "http://localhost:8200/",
  // URL_DESARROLLO: "https://efectivodigital.com.ar/",
  ACTIVAR_TEST: true,
  // URL_LOGIN: "https://efectivodigital.com.ar/",
  URL_LOGIN: "https://efectivodigital.com.ar/",
  // URL_LOGIN_DESARROLLO: "https://efectivodigital.com.ar/",
  URL_LOGIN_DESARROLLO: "http://localhost:8200/",
  
  
  // URL_LOGIN_DESARROLLO: "https://efectivodigital.com.ar/",
  // URL_LOGIN_DESARROLLO: "https://efectivodigital.com.ar/",
  mobile:false,
  get_url: () =>{
    if(!environment.mobile){
          return environment.URL_DESARROLLO
    }
    return environment.URL
    
  },
  get_url_login: () =>{
    if(!environment.mobile){
      return environment.URL_LOGIN_DESARROLLO
    }
    else{
      return environment.URL_LOGIN
    }
  }
  // URL_LOGIN: "http://172.17.0.1:360/"
  // ionic cordova run browser --livereload  --consolelogs --serverlogs
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
