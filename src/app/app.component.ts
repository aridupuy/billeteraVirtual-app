import { UsuarioService } from './service/usuario.service';
import { IngresopatronPage } from './ingresopatron/ingresopatron.page';
import { async } from 'rxjs';
import { IngresaPinPage } from './ingresa-pin/ingresa-pin.page';
import { IngresaPinConfirmaPage } from './ingresa-pin-confirma/ingresa-pin-confirma.page';
import { ServiceService } from './service/service.service';
import { pass } from './patron.guard';
import { Pago } from './classes/Pago';
import { HomePage } from './home/home.page';
import { AmigosPage } from './amigos/amigos.page';
import { IngresoDineroPage } from './ingreso-dinero/ingreso-dinero.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
// import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavController } from '@ionic/angular';
import { menuController } from "@ionic/core";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks, DeeplinksOriginal } from '@ionic-native/deeplinks'
import { MenuserviceService } from './service/menuservice.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LoginService } from './service/login.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public usuario;
  public iniciales = "ID";
  public modalDataResponse: any;
  public static cargando = false;
  public menu = Array();
  public DIAS = 3;
  constructor(private platform: Platform, private loginService: LoginService, private statusBar: StatusBar, private splashScreen: SplashScreen, private pago: Pago, public service: ServiceService, public menuService: MenuserviceService, public modalCtrl: ModalController, public usuarioService: UsuarioService, public navCtrl: NavController) { }
  async ngOnInit() {
    alert(environment.URL);
    alert(environment.URL_LOGIN);
    let menu = localStorage.getItem("menu");
    if (menu && menu.length > 0) {
      let data = JSON.parse(menu);
      for (var i in data) {
        this.menu.push(data[i]);
      }
    }
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // AppComponent.cargando=false;
      document.addEventListener("resume", this.onDeviceresume, false);
      document.addEventListener("pause", this.onPause, false);
      document.addEventListener("stop", this.onPause, false);
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
      // console.error("app.component");
    });
    this.pago.registrar_observer();

  }
  Ir(path) {
    this.navCtrl.navigateForward(path);
    menuController.close();
  }
  obtener_menu(i) {
    return this.menu[i];
  }
  obtener_grupo() {
    let grupo = new Array();
    for (let i = 1; i <= Object.keys(this.menu).length; i++) {
      grupo.push(i);
    }
    return grupo;
  }
  obtener_array_menu() {
    let menu = Cookie.get("menu");
    // let menu = localStorage.getItem("menu");
    if (localStorage.getItem("token") == undefined) {
      return false;
    }
    if (!menu || menu.length == 0) {
      this.menuService.obtener_menu().then((data: []) => {
        this.menu = [];
        data.forEach(element => {
          this.menu.push(element);
        });
        Cookie.set("menu", JSON.stringify(this.menu), this.DIAS);
        // localStorage.setItem("menu", JSON.stringify(this.menu));
      })
    }
    else {
      this.menu = [];
      let data = JSON.parse(menu);
      for (var i in data) {
        this.menu.push(data[i]);
      }
    }
    // alert("MENU CARGADO");
    return this.menu;
    // }
  }
  obtener_iniciales() {
    return localStorage.getItem("iniciales");
  }
  obtener_nombre() {
    if (localStorage.getItem("token") == undefined) {
      return false;
    }
    let nombre = localStorage.getItem("nombre");

    if (nombre) {
      this.usuario = nombre;
      return this.usuario;
    }
    else {
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
        // localStorage.setItem("usuario", JSON.stringify(data));
        localStorage.setItem("nombre", this.usuario);
        localStorage.setItem("iniciales", this.iniciales);
        // console.log(this.usuario);
        // alert("DATOS USUARIO CARGADO");
      });
    }
    return this.usuario;
  }


  getCargando() {
    // console.log(AppComponent.cargando);
    return AppComponent.cargando;
  }
  onPause = () => {
    // console.log("pause");
    // console.log(localStorage.getItem("onboarding"));
    if (localStorage.getItem("token") != null && localStorage.getItem("token") != "" && localStorage.getItem("onboarding") == null && localStorage.getItem("onboarding") != "1") {
      localStorage.setItem("inBackground", "1");
      this.mostrarModal("validar");
    }
  }
  onDeviceresume = async () => {
    // console.log("onDeviceresume");
    // console.log(localStorage.getItem("onboarding"));
    // localStorage.setItem("inBackground", "1");
    if (localStorage.getItem("token") != null && localStorage.getItem("token") != "" && localStorage.getItem("onboarding") == null && localStorage.getItem("onboarding") != "1")
      if (localStorage.getItem("inBackground") == "1") {
        // console.log("aca Modal patron");
        this.mostrarModal("validar");
      }
  }

  validarClave(clave1, clave2): Boolean {
    // console.log(clave1, clave2);
    if (clave1 === clave2)
      return true;
    return false;
  }

  async mostrarModal(tipo) {
    // console.log(localStorage.getItem("modal-abierto"));
    if (this.modal_abierto == 1) {
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
      // console.log(modalDataResponse);
      clave1 = modalDataResponse.data;
      localStorage.setItem("inBackground", "0");
      this.modal_abierto = 0;
      // console.log("MODAL CERRADO setitem 0");
      return true;
    });
    this.modal_abierto = 1;
    // console.log("MODAL ABIERTO setitem 1");
    await modal2.present();


  }

  public modal_abierto = 0;
  IrAtras() {
    this.navCtrl.back();
  }
  MenuDatosCuenta() {
    this.navCtrl.navigateForward("datos-cuenta");
    menuController.close()
  }
  MenuHistorial() {
    this.navCtrl.navigateForward("historial");
    menuController.close()
  }
  MenuAmigos() {
    this.navCtrl.navigateForward("amigos");
    menuController.close()
  }
  MenuIngresoDinero() {
    this.navCtrl.navigateForward("ingreso-dinero");
    menuController.close()
  }
  MenuRetiroDinero() {
    this.navCtrl.navigateForward("transferir-dinero");
    menuController.close()
  }
  MenuTransferirDinero() {
    this.navCtrl.navigateForward("retirar-dinero");
    menuController.close()
  }
  MenuCodigoQR() {
    this.navCtrl.navigateForward("codigo-qr");
    menuController.close()
  }
  MenuAyuda() {
    this.navCtrl.navigateForward("ayuda");
    menuController.close()
  }
  MenuLogout() {
    this.navCtrl.navigateForward("logout");
    menuController.close()
  }
}


// @Component({
//   selector: 'welcome',
//   template: `
//     <ion-content>
//       <ion-slides pager="true" [options]="slideOpts">
//         <ion-slide>
//           <h1>Slide 1</h1>
//         </ion-slide>
//         <ion-slide>
//           <h1>Slide 2</h1>
//         </ion-slide>
//         <ion-slide>
//           <h1>Slide 3</h1>
//         </ion-slide>
//       </ion-slides>
//     </ion-content>
//   `
// })

// export class SlideExample {
//   // Optional parameters to pass to the swiper instance.
//   // See http://idangero.us/swiper/api/ for valid options.
//   slideOpts = {
//     initialSlide: 1,
//     speed: 400
//   };
//   constructor(private screenOrientation: ScreenOrientation) {
//     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
//   }

// }