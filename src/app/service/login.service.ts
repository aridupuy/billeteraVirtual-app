import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment';

export interface Ilogin {
  resultado?:boolean;
  token: any;
  log: any;
  valido_hasta: any;
}
interface IcheckToken {
  data: any;
  check: any;
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

  URL = environment.URL_LOGIN;
  public token;
  //public storage;
  //public URL = "http://192.168.0.163:358/";

  //  constructor(private http: HttpClient) { }

  login(usuario: any, clave: any) {
    if(localStorage.getItem("token") && localStorage.getItem("token")!="false"){
      this.checkToken("api/checkToken", {token: localStorage.getItem("token")}).then(()=>console.log()).catch(()=>console.log());
    }
    console.log("aca");
    return new Promise((resolve, reject) => {
      var postParams = ({ usuario: usuario, clave: clave })
      this.post<Ilogin>('api/login', postParams,httpOption).subscribe(async (data) => {
        if (data.resultado == false && data.log != false) {
          reject(data.log);
        }
        if(localStorage.getItem("token")){
          localStorage.removeItem("token");
        }
        await localStorage.setItem("token", data.token);
        this.token = data.token;
        return resolve(this.token);
      });

      //      .pipe(
      //        tap(data => console.log(data)),
      //        catchError(this.handleError('login', []))
      //      );
    });
  }
  checkToken(url, json) {
    
    return new Promise((resolve,rejects)=>{
      if(!localStorage.getItem("token")){
        rejects(false);
      }
      this.post<IcheckToken>(url, json, httpOption)
        .subscribe(async (data) => {
          console.log("api/loginwithtoken");
          console.log(data);
          if (data != undefined  && (data.check == 1 || data.check =='true')){
            resolve(true);
          }
          else{
            let resp;
            await this.loginWithToken("api/loginwithtoken",json).then((data)=>{
              // console.log(data);
              resolve(data);
              resp = true;
            }).catch((data)=>{
              rejects(data);
              resp = false;
            });
            if(await resp){
              resolve(resp);
            }
            rejects(false);
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
          // console.log(data);
          if (data.resultado == false && data.log != false) {
            rejects(data.log);
          }
          // console.log(localStorage.getItem("token"));
          if(localStorage.getItem("token")){
            localStorage.removeItem("token");
          }
          await localStorage.setItem("token", data.token);
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