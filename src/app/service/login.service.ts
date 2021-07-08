import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment';
import Integer from '@zxing/library/esm/core/util/Integer';

export interface Ilogin {
  resultado?: boolean;
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
export class LoginService extends ServiceService {

  URL = environment.URL_LOGIN;
  public token;
  public static singleton;
  //public storage;
  //public URL = "http://192.168.0.163:358/";

  //  constructor(private http: HttpClient) { }

  login(usuario: any, clave: any) {
    if (localStorage.getItem("token")) {
      this.checkToken("api/checkToken", { token: localStorage.getItem("token") }).then(() => console.log()).catch(() => console.log());
    }
    // console.log("aca");
    return new Promise((resolve, reject) => {
      var postParams = ({ usuario: usuario, clave: clave })
      this.post<Ilogin>('api/login', postParams, httpOption).subscribe(async (data) => {
        if (data.resultado == false && data.log != false) {
          reject(data.log);
        }
        if (localStorage.getItem("token")) {
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

    return new Promise((resolve, rejects) => {
      json = {token:localStorage.getItem("token")};
      if (!localStorage.getItem("token") || localStorage.getItem("token") == 'false' || localStorage.getItem("token") == undefined) {
        console.log("no logueado");
        rejects(false);
      }
      this.post<IcheckToken>(url, json, httpOption)
        .subscribe(async (data) => {
          // console.log(data);
          if (data != undefined && (data.check == 1 || data.check == 'true')) {
            resolve(true);
            // return true;
          }
          else {
            let resp;
            if(LoginService.singleton!=null && LoginService.singleton[json.token]!=undefined)
              return data
            // if (LoginService.singleton == 0) {
              // LoginService.singleton=1;
              await this.loginWithToken("api/loginwithtoken", json).then((data) => {
                // console.log(JSON.stringify(data));
                resolve(data);
                resp = true;
                LoginService.singleton[json.token] = data;
                return resp;
              }).catch((data) => {
                // console.log(JSON.stringify(data));
                rejects(data);
                resp = false;
                
                return resp;
              });
            // }
            // else{
            //   resp = null;
            // }
            if (await resp) {
              resolve(resp);
                return true;
            }
            else 
              rejects(false);
            return false;
          }
        });
    });
  }
  public resp;
  loginWithToken(url, json) {
    // console.log("loginWithToken");
    if(this.resp!=null){
      // console.error("retorno cache loginWithToken");
      return this.resp;
    }

    return new Promise((resolve, rejects) => {
      if (!localStorage.getItem("token") || localStorage.getItem("token") == 'false' || localStorage.getItem("token") == undefined) {
        console.log("no logueado");
        localStorage.removeItem("intentosLogin");
        rejects(false);
      }
      json = {token:localStorage.getItem("token")};
      this.post<Ilogin>(url, json, httpOption)
        .subscribe(async (data) => {
          // console.log(data);
          if (data.resultado == false && data.log != false) {
            rejects(data.log);
          }

          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }

          if (data.token == false) {
            rejects(false)
            return false;
          }
          if (data["token"] != undefined)
            await localStorage.setItem("token", data.token);
          if (localStorage.getItem("intentosLogin") != undefined || localStorage.getItem("intentosLogin") != null) {
            let logIntent = localStorage.getItem("intentosLogin");
            if (Integer.parseInt(logIntent) > 2) {
              localStorage.setItem("intentosLogin", "0");
              rejects(false);
            }
            await localStorage.setItem("intentosLogin", (Integer.parseInt(logIntent) + 1).toString());
          }


          // console.log(localStorage.getItem("token"));
          this.token = data.token;
          return resolve(this.token);
        });
    });
      // console.log(JSON.stringify(this.resp));
      // return this.resp;
  }


  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(JSON.stringify(error)); // log to console instead
      console.error(JSON.stringify(error)); // log to console instead
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