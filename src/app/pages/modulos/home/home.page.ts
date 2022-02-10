import { Component, OnInit } from '@angular/core';
import { MenuController, ViewDidEnter } from '@ionic/angular';
import { formatCurrency } from '@angular/common';
import { MiCvuPage } from '../mi-cvu/mi-cvu.page';

// import { MovesDescripcionPage } from './../moves-descripcion/moves-descripcion.page';
import { SaldoService } from '../../../service/saldo.service';
import { TransaccionesService } from '../../../service/transacciones.service';
// import { Observable } from './../classes/observable';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
// import { LoginPage } from './../login/login.page';
// import { FilterPage } from './../filter/filter.page';
import { ModalController, NavController } from '@ionic/angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Transacciones } from '../../../interfaces/transacciones';
import { UsuarioService } from '../../../service/usuario.service';
// import { SaldoService } from '../service/saldo.service';
import { AppComponent } from '../../../app.component';
import { Libs } from '../../../classes/libs';
import { MenuserviceService } from '../../../service/menuservice.service';
import { FcmService } from '../../../service/fcm.service';
import { ValidacionMailService } from '../../../service/validacion-mail.service';
import { ValidacionCelService } from '../../../service/validacion-cel.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter {

  // Icon Cambia Saldo
  mostrarSaldo = localStorage.getItem("saldoVisible") == "false" ? false : true;
  ToggleIcon = 'eye-outline';
  public saldoUsuario;
  public TotalUsuario;
  public noliquidadoUsuario;
  public validado = false;
  public validacion_manual=false;
  public mensaje = "";
  public cargandoSaldo = true;
  // public cargando:boolean=false;
  static select = '1';
  static desde = null;
  static hasta = null;
  static itemsstatics: any;
  public offset = 0;
  public limit = 5
  saldo = 0;
  decimal = 0;
  items;
  itemback;
  public username;
  public iniciales;
  modalDataResponse: any;
  public valida_mail;
  public valida_cel;
  public valida_ident;
  public valida_empresa
  public muestro_menu = true;
  public mail;
  public celular;
  constructor(public modalCtrl: ModalController, public navCtl: NavController, private menu: MenuController, public validaMail: ValidacionMailService, public validaCel: ValidacionCelService, public saldoService: SaldoService, public transaccionesService: TransaccionesService, public route: ActivatedRoute, public router: Router, public usuarioService: UsuarioService, public libs: Libs, public menuService: MenuserviceService, public FcmService: FcmService) { }
  ionViewDidEnter(): void {
    this.obtener_estado();
    
  }
  obtener_estado(){
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (this.route.snapshot.queryParamMap.has("param")) {
      this.valida_ident = p.valida_ident;
      this.valida_mail = p.valida_mail;
      this.valida_cel = p.valida_cel;
      this.valida_empresa = p.valida_empresa;
      this.mensaje = p.Mensaje ? this.mensaje = p.Mensaje : this.mensaje = p.mensaje;
      this.celular = p.celular;
      AppComponent.validado = p.valido ? p.valido : false;
      this.validado = false;
      if("validacion_manual" in p)
        this.validacion_manual=p.validacion_manual;
      let cuentas = JSON.parse(localStorage.getItem("cuentas"));

      if (cuentas.length == 1) {
        this.muestro_menu = AppComponent.validado && !this.validacion_manual;
      }
      
      return;
    }
    else {
      console.log("sin datos");
      this.validado = true;
      AppComponent.validado = true;
      this.obtener_saldo();
      this.cargar_transacciones();
    }
  }

  ngOnInit(): void {
    // AppComponent.cargando=true;
    console.log("EN HOME");
    this.FcmService.getToken();
    this.obtener_estado();
    this.obtener_datos_usuario();
    this.cargar_transacciones();
  }


  cantidad_cuentas(){
    return localStorage.getItem("cuentas").length;
  }

  ir() {
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     param: JSON.stringify({rvalidar:true, ira:"/",})
    //   }
    // }
    console.log("IR");
    this.mail = localStorage.getItem("mail");
    if (this.valida_mail) {
      /*SERVICIO DE REENVIO DE MAIL */
      this.validaMail.reenviar().then(() => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            // param: JSON.stringify({ mensaje: "Revisá tu cuenta de mail y segui los pasos para confirmar que sos el dueño de la cuenta.",mail:this.mail })
            param: JSON.stringify({ mail: this.mail })
          }
        }
        this.navCtl.navigateForward("confirma-email", navigationExtras);
      }).catch(() => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify({ mensaje: "No te pudimos enviar el email, comunicate con atencion al cliente.", mail: this.mail })
          }
        }
        
        this.navCtl.navigateForward("confirmaciones", navigationExtras);
      });
    }
    if (this.valida_cel) {
      /*SERVICIO DE REENVIO DE SMS */

      this.validaCel.reenviar_codigo().then(data => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify({ celular: this.celular })
          }
        }
        this.navCtl.navigateForward("confirmasms", navigationExtras);
        return true;
      })
        .catch(err => { console.log(err); return; });
    }
    if (this.valida_empresa) {
      /*SERVICIO DE REENVIO DE MAIL */

      this.validaMail.reenviar_empresa().then(() => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify({ mensaje: "Revisá tu casilla de mail, te enviamos uno para que puedas seguir.", mail: this.mail })
          }
        }
        this.navCtl.navigateForward("confirmaciones", navigationExtras);
      }).catch(() => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            param: JSON.stringify({ mensaje: "No te pudimos enviar el email, comunicate con atencion al cliente.", mail: this.mail })
          }
        }
        this.navCtl.navigateForward("confirmaciones", navigationExtras);
      });
      return true;
    }
    if (this.valida_ident) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({ revalidar: true, ira: "/", })
        }
      }
      this.navCtl.navigateForward("validaridentidad3", navigationExtras);
      return true;
    }



  }
  async obtener_saldo() {
    await this.saldoService.obtener_all().then((data: any) => {
      console.log(data);
      this.saldoUsuario = formatCurrency(data.saldo_actual, 'es-AR', '$', 'ARS', '4.2-2');
      this.TotalUsuario = formatCurrency(data.saldo_total, 'es-AR', '$', 'ARS', '4.2-2');
      this.noliquidadoUsuario = formatCurrency(data.saldo_no_liquidado, 'es-AR', '$', 'ARS', '4.2-2');
      this.cargandoSaldo = false;
    });
  }
  toggleIcon(): void {
    this.mostrarSaldo = !this.mostrarSaldo;
    let saldoUsuarioSelector = document.querySelector(".saldoUsuario") as HTMLElement;
    if (this.mostrarSaldo == true) {
      this.ToggleIcon = 'eye-off-outline';
      saldoUsuarioSelector.innerHTML = this.saldoUsuario;
      localStorage.setItem("saldoVisible", "true");
    }
    else {
      this.ToggleIcon = 'eye-outline';
      saldoUsuarioSelector.innerHTML = "******";
      localStorage.setItem("saldoVisible", "false");
    }
  }

  // Formateador de Float a Currency
  // public saldoUsuario = 
  myDateParser(dateStr: string): string {


    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)
    if (millisecond == "") {
      millisecond = "00";
    }
    let validDate = date + 'T' + time + '.' + millisecond;
    console.log(validDate)
    return validDate
  }
  cargar_transacciones() {
    const desde = '';
    const hasta = '';
    const mp = '';
    this.transaccionesService.obtener_transacciones(this.offset, this.limit).then((data: Transacciones[]) => {
      let i = 0;
      for (const dato of data) {
        let fila = { titulo: dato.mp, precio: dato.monto_final, fecha: dato.fecha_gen, tipo: dato.concepto, id_tipo_trans: dato.id_tipo_trans, id_cuenta: dato.id_cuenta, fijo: dato.pri_fijo, variable: dato.pri_variable, monto_final: dato.monto_final, id_entidad: dato.id_entidad, id_referencia: dato.id_referencia, resumen: dato.resumen_op, click() { } };
        if (this.items == undefined) {
          this.items = [fila];
        }

        fila.fecha = this.myDateParser(fila.fecha);
        this.items[i] = fila;
        i++;
      }
      // let fila = {titulo:data[0].mp,precio:data[0].monto,fecha:data[0].fecha_pago,tipo:data[0].concepto,click: function () {}};
      // this.items[i]=fila;
      this.itemback = this.items;
      console.log(this.items);
    });


  }
  fecha_espaniol(fecha) {

    switch (fecha) {
      case "1":
        return "Enero";
        break;
      case "2":
        return "Febrero";
        break;
      case "3":
        return "Marzo";
        break;
      case "4":
        return "Abril";
        break;
      case "5":
        return "Mayo";
        break;
      case "6":
        return "Junio";
        break;
      case "7":
        return "Julio";
        break;
      case "8":
        return "Agosto";
        break;
      case "9":
        return "Septiembre";
        break;
      case "10":
        return "Octubre";
        break;
      case "11":
        return "Noviembre";
        break;
      case "12":
        return "Diciembre";
        break;
    }
  }
  cargar_transacciones_filtrado(event?) {
    const desde = '';
    const hasta = '';
    const mp = '';
    // tslint:disable-next-line: max-line-length
    this.transaccionesService.obtener_transacciones_filtrado(HomePage.desde, HomePage.hasta, mp, this.limit, this.offset, localStorage.getItem('token')).then((data: Transacciones[]) => {
      //console.log(data);
      let i = 0;
      for (const dato of data) {
        const fila = { titulo: dato.mp, precio: dato.monto, fecha: dato.fecha_pago, tipo: dato.concepto, id_tipo_trans: dato.id_tipo_trans, id_cuenta: dato.id_cuenta, fijo: dato.pri_fijo, variable: dato.pri_variable, monto_final: dato.monto_final, id_entidad: dato.id_entidad, id_referencia: dato.id_referencia, resumen: dato.resumen_op, click() { } };
        // tslint:disable-next-line: triple-equals
        if (this.items == undefined) {
          this.items = [fila];
        }
        this.items.push(fila);
        i++;
      }
      // let fila = {titulo:data[0].mp,precio:data[0].monto,fecha:data[0].fecha_pago,tipo:data[0].concepto,click: function () {}};
      // this.items[i]=fila;
      this.itemback = this.items;
      if (event) {
        event.target.complete();
        // this.class_refresher="";
      }
    }).catch(err => { console.log(err); });
  }
  abreMenu() {
    this.menu.enable(true, 'menuPrincipal');
    this.menu.open('menuPrincipal');
  }

  obtener_datos_usuario() {

    let nombre = localStorage.getItem("nombre");
    let iniciales = localStorage.getItem("iniciales");
    if (nombre && iniciales) {
      this.username = nombre;
      this.iniciales = iniciales;
      // return false;
    }
    // this.usuarioService.obtener_mis_datos().then((data:any)=>{

    //     this.username = data.nombre;
    //     localStorage.setItem("nombre",this.username);
    // });
    else {
      nombre = localStorage.getItem("nombre");
      if (nombre && this.iniciales) {
        this.username = nombre;

        // return false;
      } else {
        this.usuarioService.obtener_mis_datos().then((data: any) => {
          console.log("aca donde queres estar");
          console.log(data);
          this.username = data.nombre;
          this.iniciales = this.libs.iniciales(data.nombre_completo);
          this.mail = data.email;
          this.celular = data.celular;
          console.log("aca");
          localStorage.setItem("nombre", this.username);
          localStorage.setItem("iniciales", this.iniciales);
          localStorage.setItem("mail", this.mail);
          // console.log(this.username);
        });
      }
    }
    // alert("aca");
    let menu = Cookie.get("menu");
    AppComponent.menu = [];
    AppComponent.menu.length = 0;
    if (AppComponent.token != localStorage.getItem("token") || !menu || menu.length == 0) {
      Cookie.delete("menu");
      this.menuService.obtener_menu().then((data: []) => {
        console.log("Levanto desde api");
        AppComponent.menu = [];
        data.forEach(element => {
          AppComponent.menu.push(element);
        });
        console.log(this.menu);
        AppComponent.token = localStorage.getItem("token");
        Cookie.set("menu", JSON.stringify(AppComponent.menu), AppComponent.DIAS);
      })
    }
    else {
      console.log("Levanto desde interno");
      let data = JSON.parse(menu);
      for (var i in data) {
        AppComponent.menu.push(data[i]);
      }
      Cookie.set("menu", JSON.stringify(AppComponent.menu), AppComponent.DIAS);
      console.log(AppComponent.menu);
    }
  }
  async VerCvu() {
    const modal = await this.modalCtrl.create({
      component: MiCvuPage
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : ' + modalDataResponse.data);
      }
    });

    return await modal.present();
  }

  MenuIngresoDinero() {
    this.navCtl.navigateForward(this.navigateMenu(this.obtener_menu(), "ingreso-dinero"));
  }
  MenuTransferirDinero() {
    this.navCtl.navigateForward(this.navigateMenu(this.obtener_menu(), "retiro-transferencia"));
  }
  MenuRetiroDinero() {
    this.navCtl.navigateForward(this.navigateMenu(this.obtener_menu(), "retirar-dinero"));
  }
  MenuCodigoQR() {
    this.navCtl.navigateForward(this.navigateMenu(this.obtener_menu(), "Qr-pago"));
  }
  puede(menu, item) {
    if (menu == undefined)
      return false;
    let puede = menu.filter(menuElement => {
      let submenu = menuElement.filter(submenuElmement => {
        return submenuElmement.path == item
      });
      return submenu.length != 0;
    })
    return puede.length != 0;
  }
  navigateMenu(menu, item): string {
    let path = "";
    menu.find(menuElement => {
      let submenu = menuElement.filter(submenuElmement => {
        if (submenuElmement.path == item) {
          path = submenuElmement.path;
        }
        return submenuElmement.path == item
      });
      return submenu.length != 0;
    });
    console.log(path);
    return path;
  }
  obtener_menu() {
    return AppComponent.menu;
  }
  irAHistorial() {
    this.navCtl.navigateForward("historial");
  }
  verMas(item) {
    console.log(item);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ item: item })
      }
    }
    this.navCtl.navigateForward("detalle-transaccion", navigationExtras);
    //this.navCtl.navigateForward("detalle-transaccion",);
  }

  validarNotificaciones() {
    var notifs = JSON.parse(localStorage.getItem("notification"));
    if (!notifs) {
      return false;
    }
    notifs = Object.values(notifs);
    let nuevo = false;
    notifs.forEach(element => {
      if (element.nuevo) {
        nuevo = true
      }
    });
    return nuevo;
  }
  VerNotificaciones() {
    this.navCtl.navigateForward("notificaciones");
  }
}
