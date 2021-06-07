import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-validaridentidad',
  templateUrl: './validaridentidad.page.html',
  styleUrls: ['./validaridentidad.page.scss'],
})
export class ValidaridentidadPage implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('img') img: ElementRef;
  constructor(public route: ActivatedRoute,public router: Router,private navCtrl : NavController) { }


  public imagen;

  ngOnInit() {

  }
  Continuar(){
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        
        param: JSON.stringify(p)
      }
    };

    this.navCtrl.navigateForward("validaridentidad1",navigationExtras);
  }
  NoPuedo(){
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        
        param: JSON.stringify(p)
      }
    };
    this.navCtrl.navigateForward("validaridentidad-mastarde",navigationExtras);
  }
  
}
