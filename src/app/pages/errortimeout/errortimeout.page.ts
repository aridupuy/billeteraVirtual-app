import { Router } from '@angular/router';
import { NavController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errortimeout',
  templateUrl: './errortimeout.page.html',
  styleUrls: ['./errortimeout.page.scss'],
})
export class ErrortimeoutPage implements OnInit,ViewDidEnter,ViewDidLeave {

  ocultar=false;
  constructor(private navCtrl:Router) { }
  ionViewDidLeave(): void {
    console.log("ionViewDidLeave");
  }
  ionViewDidEnter(): void {
    this.ocultar=false
  }

  ngOnInit() {
    this.ocultar=false
  }
  reintentar(){
    this.ocultar=true;
    this.navCtrl.navigateByUrl("/").then(data=>{
      this.ocultar=false;
    });
  }
  
}
