import { AppComponent } from '../../../app.component';
import { NavController, ViewDidLeave } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-first',
  templateUrl: './home-first.page.html',
  styleUrls: ['./home-first.page.scss'],
})
export class HomeFirstPage implements OnInit,ViewDidLeave {

  constructor(private NavController:NavController) { }

  ngOnInit() {
    AppComponent.cargando=false;
    return this.NavController.navigateRoot("home");
  }
  getSplash() {
    // if(AppComponent.splash)console.log("MUESTRO SPLASH");
    //return AppComponent.splash;
    if (document.getElementById("splash") == null) {
      return true;
    }
    // if (AppComponent.splash == false) {
    //   document.getElementById("splash").setAttribute("class", "noVisible");
    // }
    // else {
      document.getElementById("splash").setAttribute("class", "Visible");
      
    // }
    return true;

  }
  ionViewDidLeave() {
    

  }
}
