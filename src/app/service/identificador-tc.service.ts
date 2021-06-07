import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url='https://lookup.binlist.net/';
const httpOption = {

  headers: { 'Content-Type': 'application/json','Accept-Version': '3',
  'X-Client': 'Node.js 2.0.1', 'Authorization': 'Basic '}

};
@Injectable({
  providedIn: 'root'
})
export class IdentificadorTcService extends HttpClient{
  

  identificar(nro){
    
    return new Promise((resolve,reject)=>{
      this.get(url+nro,httpOption).subscribe(data=>{
        if(data!=undefined)
          resolve(data);
        reject(false);
      })
    })
  }
}
