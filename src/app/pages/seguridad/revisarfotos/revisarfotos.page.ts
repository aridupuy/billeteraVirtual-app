import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AfterViewInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit,EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { alertController } from '@ionic/core';


@Component({
  selector: 'app-revisarfotos',
  templateUrl: './revisarfotos.page.html',
  styleUrls: ['./revisarfotos.page.scss'],
})
export class RevisarfotosPage implements OnInit, AfterViewInit {

  public editable;
  constructor(private screenOrientation: ScreenOrientation, private plt: Platform, private navCtrl: NavController, public route: ActivatedRoute, public router: Router) { }

  public dniD;
  public dniF;
  public cara;
  public caraDni;
  public platform;
  ngOnInit() {
    if (!(this.plt.is("desktop") || this.plt.is("mobile") || this.plt.is("mobileweb"))) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      localStorage.setItem("onboardingLastPage", "revisarfotos");
    }
  }
  ionViewDidEnter() {
    if (!(this.plt.is("desktop") || this.plt.is("mobile") || this.plt.is("mobileweb"))) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
  ngAfterViewInit(): void {
    if (!(this.plt.is("desktop") || this.plt.is("mobile") || this.plt.is("mobileweb"))) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p != null) {
      if ("foto_frente" in p)
        this.cara = p.foto_frente;
      if ("foto_frente_dni" in p) {
        this.dniF = p.foto_frente_dni;
        var data = { image: this.dniF, x: 640, y: 320, with: 320, height: 320 }
      }
      if ("foto_dorso_dni" in p)
        this.dniD = p.foto_dorso_dni;
      if ("foto_frente_con_dni" in p)
        this.caraDni = p.foto_frente_con_dni;
    }
    let vars = Onboarding_vars.get();
    this.platform=vars.platform == "manual";
    console.log(this.plt.platforms());
    if(this.plt.is("desktop") || this.plt.is("mobile") || this.plt.is("mobileweb")){
      this.platform=true;
    }
    // vars.platform == "manual" ? this.editar() : false;


    // setTimeout(()=>{
    //   // this.dniF = this.recortarImage(this.dniF);
    // },2000);

    // return this.ngOnInit();
  }
  Continuar() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    
    if(!this.cara || !this.dniF || !this.dniD || !this.caraDni){
      alertController.create
    }

    if(p){
      Onboarding_vars.add({foto_frente: p.foto_frente});
      Onboarding_vars.add({foto_frente_dni: p.foto_frente});
      Onboarding_vars.add({foto_dorso_dni: p.foto_dorso_dni});
      Onboarding_vars.add({foto_frente_con_dni: p.foto_frente_con_dni });
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ foto_frente: this.cara.toString(), foto_frente_dni: this.dniF.toString(), foto_dorso_dni: this.dniD.toString(), foto_frente_con_dni: this.caraDni.toString() })
      }
    };
    
    console.log(JSON.stringify(this.platform));

    if(this.platform){
      this.navCtrl.navigateRoot("procesarfotoscargadas",navigationExtras);
    }
    else
      this.navCtrl.navigateRoot("procesarfotos", navigationExtras);

  }
  editar() {
    const editarFoto = document.querySelectorAll(".foto");
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

  cargar_image(numero,event){
    var reader  = new FileReader();
    const file = event.target.files[0];
    switch (numero){
      case 1:
        reader.readAsDataURL(file);
        reader.onload=()=>{
          this.dniF=reader.result;
        }   
        break;
      case 2:
        reader.readAsDataURL(file);
        reader.onload=()=>{
          this.dniD=reader.result;
        }   
        break;
      case 3:
        reader.readAsDataURL(file);
        reader.onload=()=>{
          this.cara=reader.result;
        }   
        break;
      case 4:
        reader.readAsDataURL(file);
        reader.onload=()=>{
          this.caraDni=reader.result;
        } 
        break;
    }
     this.editable=false;
    
  }
  subir(num){

  }
  
}
