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
    if(localStorage.getItem("token")){
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
        .subscribe((data) => {
          // console.log(data);
          if (data != undefined  && (data.check == 1 || data.check =='true')){
            resolve(true);
          }
          else{
            rejects(false);
          }
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