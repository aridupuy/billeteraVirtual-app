import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var httpOptions = {

  headers: { 'Content-Type': 'application/json'}

};
export interface proceso {
  token: any;
  valido_hasta: any;
  log?:any;
}
@Injectable({
  providedIn: 'root'
})
export class LoginBoService extends ServiceService{

  //URL = "http://localhost:358/";

  login(){
    return new Promise((resolve, reject) => {
      var postParams = ({ jwl: "6LO8r5qLIheTjYaUTEwLqOr4DAUCTve27jvDDYo2POPVnPUhuj9TWKMUZKwyHIrXzWR08FTCVkQFAEfqrHOqbweEKORyoWZe7yyHwb0k0xE60i45Y4k8vEeyoWjCUt76"});
      this.post<proceso>('api/loginBo',postParams,httpOptions).subscribe((data) => {
        if (data.log != null && data.log != false) {
          reject(data.log);
        }
        return resolve(data.token);
      });
    });
  }
}