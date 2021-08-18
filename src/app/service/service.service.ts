import { Event } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
export const CLAVE_ENCRIPTACION = 'teganamoscon9';
interface CipherParams {
  iv?: string;
  salt?: string;
  ciphertext?: string;
  key?: string;
  words?: any
}
export const CryptoJSAesJson = {
  // tslint:disable-next-line: max-line-length
  stringify: (cipherParams: { ciphertext: { toString: (arg0: any) => any; }; iv: { toString: () => any; }; salt: { toString: () => any; }; }) => {

    const j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) { j["iv"] = cipherParams.iv.toString(); }
    if (cipherParams.salt) { j["s"] = cipherParams.salt.toString(); }
    return JSON.stringify(j);
  },
  parse: (jsonStr: string) => {
    const j = JSON.parse(jsonStr);
    // console.log(j);C
    if(!j || j.log!=undefined){
      AppComponent.cargando=false;
      return false;
    }
    const cipherParams: CipherParams  = CryptoJS.lib.WordArray.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) });
    cipherParams.ciphertext=cipherParams.words.ciphertext;
    if (j.iv) { cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv); }
    if (j.s) { cipherParams.salt = CryptoJS.enc.Hex.parse(j.s); }
    return cipherParams;
  }
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends HttpClient {
  public URL = environment.URL;


  public encrypt(params: any, pass: string) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), pass, { format: CryptoJSAesJson }).toString();
    return encrypted;
  }
  public decrypt(encrypted: string, pass: string) {
    let json =  CryptoJS.AES.decrypt(encrypted, pass, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8)
    // console.log(json);
    if(!json){
      return {};
    }
    const decrypted = JSON.parse(json);
    AppComponent.cargando=false;
    return decrypted;
  }
  /* @overrride */
  // tslint:disable-next-line: align
  public post<T>(url: string, body: any | null, options?): Observable<T> {
    AppComponent.cargando=true;
    console.log("URL POST"+url);
    
     let post = super.post<T>(this.URL + url, this.encrypt(body, CLAVE_ENCRIPTACION), options).pipe<T>(
      map((data) => {
        if (data['token'] != undefined || data['tokenError'] != undefined ) {
          AppComponent.cargando=false;
          return data as unknown as T;
        }
        // tslint:disable-next-line: comment-format
          return JSON.parse(this.decrypt(JSON.stringify(data), CLAVE_ENCRIPTACION)) as T;
      }
      )
    ).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
            console.log(error.error);
            AppComponent.cargando=false;
        } 
        return [];
    }));
    // post.subscribe(null,err=>{
    //   console.log(err);
    //   //aca podria levantar una vista general de error;
    //   AppComponent.cargando=false;
    // });
    return post;
  }


  public get<T>(url: string, options) {
    AppComponent.cargando=true;
    console.log(url);
    console.log("URL GET "+url);
    
    let get= super.get<T>(this.URL + url, options)
    .pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
            console.log(error.error);
            AppComponent.cargando=false;
        } 
        return [];
    }))
    .pipe<T>(
      
      map(data => {
        if (data['token'] != undefined) {
          AppComponent.cargando=false;
          return data as unknown as T;
        }
        // console.log(data);
        return JSON.parse(this.decrypt(JSON.stringify(data), CLAVE_ENCRIPTACION)) as T;
      }
      )
    );
    // get.subscribe(data=>{},err=>{
    //   console.log(err);
    //   AppComponent.cargando=false;
    // })
    return get;
  }
}
