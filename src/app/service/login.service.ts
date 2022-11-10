import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Observable as MiObserver}  from '../classes/observable';
import { Router } from '@angular/router';
import { HttpHandler } from '@angular/common/http';

export interface Ilogin {
  resultado?:boolean;
  token: any;
  log: any;
  valido_hasta: any;
}
interface IcheckToken {
  data: any;
  check: any;
  cuentas:any[];
}
//@NgModule({providers: [forwardRef(() => LoginService)]})

//@Injectable({
//  providedIn: 'root'
//})
//@NgModule({providers: [libs_http]})
//const httpOptions = {
//  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//};
const httpOption = {

  headers: { 'Content-Type': 'application/json' }

};
@Injectable()
export class LoginService extends ServiceService{

  URL = environment.get_url_login();

  public token;
  //public storage;
  //public URL = "http://192.168.0.163:358/";

  constructor(private router: Router,private httpHandler:HttpHandler){
    super(httpHandler);
  }

  login(usuario: any, clave: any) {
    if(localStorage.getItem("token") && localStorage.getItem("token")!="false"){
      this.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(()=>console.log()).catch(()=>console.log());
    }
    return new Promise((resolve, reject) => {
      var postParams = ({ usuario: usuario, clave: clave })
      this.post<Ilogin>('api/login', postParams,httpOption).subscribe(async (data) => {
        console.log(data);
        if (data.resultado == false && data.log != false) {
          reject(data.log);
        }
        if(localStorage.getItem("token")){
          localStorage.removeItem("token");
        }
        localStorage.setItem("token", data[0].token);
        localStorage.setItem("cuentas", JSON.stringify(data));
        localStorage.setItem("nombreEmpresa", data[0].titular[0]);
        localStorage.setItem("inicialesEmpresa", data[0].iniciales);

        this.token = data[0].token;
        return resolve(this.token);
      });


    });
  }
   checkToken(url, json) {
    return new Promise(async (resolve,rejects)=>{
      if(!localStorage.getItem("token")){
        console.log("No hay token");
        rejects(false);
      }
      console.log(json);
      await this.post<IcheckToken>(url, json, httpOption)
        .subscribe(async (data) => {
          if (data != undefined && (data.check == 1 || data.check == 'true' || data.check == true)) {
            // if(localStorage.getItem("token")!=data.cuentas[0].token){
              if(data.cuentas.find((item)=>{
                localStorage.getItem("token")==item;
              })){
              // localStorage.removeItem("token");
              // localStorage.setItem("token",json.token);
              localStorage.removeItem("cuentas");
              localStorage.removeItem("nombreEmpresa");
              localStorage.removeItem("inicialesEmpresa");
              this.router.navigate(['/ingreso']);
              
              return rejects(data);
            }
            console.log(`token localStorage: ${localStorage.getItem("token")}`);
            console.log(`checkToken: ${JSON.stringify(data)}`);
            localStorage.setItem("cuentas", JSON.stringify(data.cuentas));
            console.log(`sale bien`);
            return  resolve(data);
          }
          else {
            let resp;
            await this.loginWithToken("api/loginwithtoken", json).then((data) => {
              console.log("aca loginWithToken");
              console.log(data);
              console.log(`sale bien`);
              return  resolve(data);
              resp = true;
            }).catch((data) => {
              console.log("aca loginWithToken false");
              console.log(data);
              console.log(`sale bien`);
              return  rejects(data);
              resp = false;
            });
            if (await resp) {
              console.log(`sale bien`);
              return resolve(resp);
            }
            console.log(`sale mal`);
            return  rejects(false);
          }
        }) ;
    });
  }

  loginWithToken(url, json) {

    return new Promise((resolve,rejects)=>{
      if(!localStorage.getItem("token")){
        rejects(false);
      }



      this.post<Ilogin>(url, json, httpOption)
        .subscribe(async (data) => {
          if (data.resultado == false && data.log != false) {
            rejects(data.log);
          }
          // console.log(localStorage.getItem("token"));
          if(localStorage.getItem("token")){
            localStorage.removeItem("token");
          }
          if(data==undefined || (!("token" in data))){
            MiObserver.notify("error_token","");
            return false;
          }
          localStorage.setItem("token", data.token);
          // console.log(localStorage.getItem("token"));
          if(!data.token)
            rejects(false)
          this.token = data.token;
          return resolve(this.token);
        }) ;
    });
  }


  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("Error de HTTP");
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log("mensaje: " + message);
  }
}
