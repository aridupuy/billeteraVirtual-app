import { ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AfterViewInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-revisarfotos',
  templateUrl: './revisarfotos.page.html',
  styleUrls: ['./revisarfotos.page.scss'],
})
export class RevisarfotosPage implements OnInit, AfterViewInit {

  public editable;
  constructor(private screenOrientation: ScreenOrientation,private plt: Platform, private navCtrl: NavController, public route: ActivatedRoute, public router: Router) { }

  public dniD;
  public dniF;
  public cara;
  public caraDni;
  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  ngAfterViewInit(): void {


    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    this.cara = p.foto_frente;
    this.dniF = p.foto_frente_dni;
    this.dniD = p.foto_dorso_dni;
    this.caraDni = p.foto_frente_con_dni;
    let data = { image: this.dniF, x: 640, y: 320, with: 320, height: 320 }
    // setTimeout(()=>{
    //   // this.dniF = this.recortarImage(this.dniF);
    // },2000);

    // return this.ngOnInit();
  }
  Continuar() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      }
    };

    this.navCtrl.navigateRoot("procesarfotos", navigationExtras);

  }
  editar() {
    const editarFoto = document.querySelectorAll(".foto img");
    for (var i = 0; i < editarFoto.length; ++i) {
      editarFoto[i].classList.add('editar');
    }
    this.editable = true;
  }
  volver(cual) {
    console.log("volver");
    if (!this.editable)
      return false;
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    p["editar"] = true;
    let page = "";
    switch (cual) {
      case 1:
        page = "validaridentidad1";
        break;
      case 2:
        page = "validaridentidad2";
        break;
      case 3:
        page = "validaridentidad3";
        break;
      case 4:
        page = "validaridentidad4";
        break;
      default:
        return false;

    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      }
    };
    this.navCtrl.navigateRoot(page, navigationExtras);
  }



}
