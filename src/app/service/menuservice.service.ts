import { ServiceService } from './service.service';
import { Imenu } from '../interfaces/Imenu';
import { Injectable } from '@angular/core';

var httpOptions = {

  headers: { 'Content-Type': 'application/json', "token": "" }

};
@Injectable({
  providedIn: 'root'
})
export class MenuserviceService extends ServiceService {

  obtener_menu() {
    return new Promise((resolve, rejects) => {
      httpOptions.headers.token = localStorage.getItem("token");
      this.get<Imenu>('api/menu/obtener_menu', httpOptions).subscribe((data) => {
        if (data.resultado != null && data.resultado === false) {
          rejects(data.log);
        }
        // console.log(data.extras[0]);
        let menu = new Array();
        for ( let  i in data.extras[0]){
          menu.push(data.extras[0][i]);
        }
        return resolve(menu);
      });
    }
    );
  }
}
