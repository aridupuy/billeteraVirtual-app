import { environment } from '../environments/environment';
import { UsuarioService } from './service/usuario.service';
import { ServiceService } from './service/service.service';
import { Pago } from './classes/Pago';
import { HomePage } from './pages/modulos/home/home.page';

import { CambiarCuentaPage } from './components/cambiar-cuenta/cambiar-cuenta.page';
import {
  IngresaPinPage
} from './pages/seguridad/ingresa-pin/ingresa-pin.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { menuController } from "@ionic/core";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks, DeeplinksOriginal } from '@ionic-native/deeplinks'
import { AmigosPage } from './pages/modulos/amigos/amigos.page';
import { IngresoDineroPage } from './pages/modulos/ingreso-dinero/ingreso-dinero.page';
import { PermisoService } from './service/permiso.service';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public usuario;
  public empresa;
  public iniciales;
  public iniciales_empresa;
  public modalDataResponse: any;
  public static cargando = false;
  public static splash = true;
  public static menu = Array();
  public static DIAS = 1;
  public static login = false;
  public static token;
  public static validado = true;
  // public static _this;
  constructor(public permisoService: PermisoService, public Router: Router, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private pago: Pago, public service: ServiceService, public modalCtrl: ModalController, public usuarioService: UsuarioService, public navCtrl: NavController) {
    // console.log(platform.is("cordova"));
    environment.mobile = platform.is("cordova");
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#000000');
    // AppComponent._this = this;
    this.Router.events.subscribe(async event => {
      if (event instanceof NavigationStart) {
        if (localStorage.getItem("token") != undefined) {
          console.log("REVISANDO PERMISOS");
          var resp = false;
          console.log(event.url.substring(1,event.url.length));
          await this.permisoService.puede(event.url.substring(1,event.url.length)).then(data => {
            console.log("SALE BIEN");
            console.log(data);
            resp = true;
          }).catch(data => {
            console.log("SALE MAL");
            /*aca deberia ir a una pantalla de acceso denegado */
            resp = false;
          })
          if (!resp && event.url != "/home")
            this.Router.navigate(['/accesodenegado']);
        }
      }
    });
  }
  mostrar_menu() {
    return AppComponent.login;
  }
  es_valido() {
    if (JSON.parse(localStorage.getItem("cuentas")).length > 0)
      return true;
    return AppComponent.validado;
  }
  ngOnInit() {

    console.log("ngOnInit");
    this.splashScreen.show();
    //localStorage.setItem("modalValidado","0");
    localStorage.setItem("modalAbiero", "0");
    let nombre = localStorage.getItem("nombre");
    if (nombre && this.iniciales) {
      this.usuario = nombre;

      return false;
    }

    // console.log(this.menu);

    if (localStorage.getItem("token") != null)
      this.usuarioService.obtener_mis_datos().then((data: any) => {
        this.usuario = data.nombre;
        this.iniciales = data.nombre_completo
          .split(' ')
          .map(it => it.charAt(0))
          .slice(0, 1)
          .join('')
          + data.nombre_completo
            .split(' ')
            .map(it => it.charAt(0))
            .slice(2, 3)
            .join('');
        // console.log("aca");
        localStorage.setItem("nombre", this.usuario);
        localStorage.setItem("iniciales", this.iniciales);
        AppComponent.login = true;

        // console.log(this.usuario);
      }).catch(err => {
        console.log(err);

      });
    // console.dir(this.platform);
    // console.log("PLATFORM");
    this.platform.pause.subscribe(() => {
      // console.log('[INFO] App paused');
      return this.onPause();
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // console.log("SPLASH_HIDE");
      this.splashScreen.hide();
      AppComponent.splash = false;
      // AppComponent.cargando=false;
      // document.addEventListener("resume", this.onDeviceresume, false);
      document.onpause = this.onPause;
      document.addEventListener("pause", this.onPause, false);
      document.addEventListener("resume", this.onDeviceresume, false);
      document.addEventListener("freeze", this.onPause, false);
     

      /*Esto es un test para mas adelante */
      Deeplinks.routeWithNavController(this.navCtrl, {
        '/': HomePage,
        '/amigos': AmigosPage,
        '/ingresodinero': IngresoDineroPage
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });
      this.pago.registrar_observer();
    });
    console.log("Termina");
  }
  Ir(path) {
    this.navCtrl.navigateForward(path);
    menuController.close();
  }
  obtener_menu(i) {
    return AppComponent.menu[i];
  }
  obtener_grupo() {
    let grupo = new Array();
    for (let i = 1; i <= Object.keys(AppComponent.menu).length; i++) {
      grupo.push(i);
    }
    return grupo;
  }
  get_iniciales() {
    if (!this.iniciales)
      this.iniciales = localStorage.getItem("iniciales");

    return this.iniciales;
  }
  get_iniciales_empresa() {
    if (!this.iniciales_empresa || this.iniciales_empresa != localStorage.getItem("inicialesEmpresa"))
      this.iniciales_empresa = localStorage.getItem("inicialesEmpresa");

    return this.iniciales_empresa;
  }
  get_empresa() {
    if (!this.empresa || this.empresa != localStorage.getItem("nombreEmpresa"))
      this.empresa = localStorage.getItem("nombreEmpresa");
    return this.empresa;
  }
  get_menu() {
    return AppComponent.menu;
  }
  addClass() {
    if (this.platform.is("ios"))
      return "bajarIos";
    return "";
  }
  getCargando() {
    // console.log(AppComponent.cargando);
    return AppComponent.cargando;
  }
  getSplash() {
    // if(AppComponent.splash)console.log("MUESTRO SPLASH");
    //return AppComponent.splash;
    if (document.getElementById("splash") == null) {
      return true;
    }
    if (AppComponent.splash == false) {
      document.getElementById("splash").setAttribute("class", "noVisible");
    }
    else {
      document.getElementById("splash").setAttribute("class", "Visible");
    }
    return true;

  }
  onDeviceresume = () => {

    AppComponent.splash = false;
    document.getElementById("splash").setAttribute("class", "noVisible");
    console.log(localStorage.getItem("modalAbiero"));
    if (localStorage.getItem("modalAbiero") == '0') {
      if (localStorage.getItem("token") != "false" && localStorage.getItem("token") != null && localStorage.getItem("token") != "" && localStorage.getItem("onboarding") == null && localStorage.getItem("onboarding") != "1") {
        localStorage.setItem("inBackground", "1");
        localStorage.setItem("modalValidado", "0");
        this.mostrarModal("validar");
      }
    }
  }

  onPause = () => {
    // console.log("ONPAUSE");
    console.dir(AppComponent);
    AppComponent.splash = true;
    document.getElementById("splash").setAttribute("class", "visible");

  }

  validarClave(clave1, clave2): Boolean {
    console.log(clave1, clave2);
    if (clave1 === clave2)
      return true;
    return false;
  }

  async mostrarModal(tipo) {
    console.log(localStorage.getItem("modal-abierto"));
    if (AppComponent.modal_abierto == 1) {
      // console.log("no abre");
      return false;
    }
    else {
      // console.log("abre");
    }
    const modal2 = await this.modalCtrl.create({
      component: IngresaPinPage,
      componentProps: { tipo: tipo }
    });

    modal2.onDidDismiss().then(async (modalDataResponse) => {
      let clave1;
      AppComponent.splash = false;
      // console.log(modalDataResponse);
      clave1 = modalDataResponse.data;
      localStorage.setItem("inBackground", "0");
      AppComponent.modal_abierto = 0;
      // console.log("MODAL CERRADO setitem 0");
      return true;
    });
    AppComponent.modal_abierto = 1;
    // console.log("MODAL ABIERTO setitem 1");
    await modal2.present();


  }

  public static modal_abierto = 0;
  IrAtras() {
    this.navCtrl.back();
  }

  MenuAyuda() {
    this.navCtrl.navigateForward("ayuda");
    menuController.close()
  }

  async cambiar() {
    const modal3 = await this.modalCtrl.create({
      component: CambiarCuentaPage,
    });
    console.log("aca");
    modal3.onDidDismiss().then(async (modalDataResponse) => {
      console.log("ca RELOAD ");
      localStorage.removeItem("nombre");
      localStorage.removeItem("iniciales");
      this.iniciales = false;
      this.usuario = false;
      await localStorage.setItem("CambioCuenta", "1");

      //this.ngOnInit();
      await location.reload();

    });
    await modal3.present();
  }

}

