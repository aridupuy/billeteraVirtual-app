import { Event } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


import { Observable } from 'rxjs';
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
    const decrypted = JSON.parse(CryptoJS.AES.decrypt(encrypted, pass, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8));
    return decrypted;
  }
  /* @overrride */
  // tslint:disable-next-line: align
  public post<T>(url: string, body: any | null, options?): Observable<T> {

    return super.post<T>(this.URL + url, this.encrypt(body, CLAVE_ENCRIPTACION), options).pipe<T>(
      map((data) => {
        if (data['token'] != undefined || data['tokenError'] != undefined ) {

          return data as unknown as T;
        }
        // tslint:disable-next-line: comment-format
        return JSON.parse(this.decrypt(JSON.stringify(data), CLAVE_ENCRIPTACION)) as T;
      }
      )
    );
  }


  public get<T>(url: string, options) {
    return super.get<T>(this.URL + url, options).pipe<T>(

      map(data => {
        if (data['token'] != undefined) {
          return data as unknown as T;
        }
        return JSON.parse(this.decrypt(JSON.stringify(data), CLAVE_ENCRIPTACION)) as T;
      }
      )
    );

  }
}
