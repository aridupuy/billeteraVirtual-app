import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginBoService } from '../../../service/login-bo.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { ValidausuarioService } from '../../../service/validausuario.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.page.html',
  styleUrls: ['./lostpassword.page.scss'],
})
export class LostpasswordPage implements OnInit {
  ToggleIconMail = 'mail-outline';
  ToggleIconTel = 'chatbox-ellipses-outline';
  usuario: string;
  logued: boolean;
  telefono: string;
  selectmail: boolean = false;
  selectTel: boolean = false;
  mail: string;
  celular: string;
  SeleccionadoMail() {
    const selectorMail = document.querySelector("#mail")
    selectorMail.classList.toggle("activo")
    if (selectorMail.classList.contains("activo")) {
      this.ToggleIconMail = 'checkmark-outline';
      document.querySelector("#telefono").classList.remove("activo");
      this.selectmail = true;
      this.selectTel = false;
    }
    else {
      this.selectmail = false;
      this.selectTel = false;
      this.ToggleIconMail = 'mail-outline';
      document.querySelector("#telefono").classList.remove("activo");
    }
  }
  SeleccionadoTel() {
    const selector = document.querySelector("#telefono")
    selector.classList.toggle("activo")
    if (selector.classList.contains("activo")) {
      this.selectTel = true;
      this.selectmail = false;
      this.ToggleIconTel = 'checkmark-outline';
      document.querySelector("#mail").classList.remove("activo");
      this.ToggleIconMail = 'chatbox-ellipses-outline';
    }
    else {
      this.selectTel = false;
      this.selectmail = false;
      this.ToggleIconTel = 'chatbox-ellipses-outline';
      document.querySelector("#mail").classList.remove("activo");
    }
    console.log("telefono", this.selectTel);
    console.log("mail", this.selectmail);
  }
  constructor(public ValidausuarioService: ValidausuarioService, private navCtrl: NavController, public route: ActivatedRoute, public pocesoalta: InicioProcesoService, protected loginbo: LoginBoService, public alertController: AlertController) {

    // this.usuario = p.usuario;
    // this.logued = p.logued;
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ingresa primero tu usuario',
      subHeader: '',
      message: 'Sin el usuario no podremos identificarte.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    let vars = Onboarding_vars.get();
    console.log(p.usuario);
    if (!(p == undefined || p.usuario == undefined || p.usuario == "")) {
      console.log("aca");
       this.loginbo.login().then(async token => {
        console.log(token);
         this.ValidausuarioService.validar_usuario(p.usuario.toLowerCase(), vars.pfpj, token).then(data => {
          console.log(data);
          this.loginbo.login().then(token => {
            this.pocesoalta.obtener_datos(p.usuario, token).then((data: { cel: string, mail: string }) => {
              this.mail = data.mail;
              this.celular = data.cel;
            })
          })
        }).catch(async err=>{
          console.log("aca");
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: "Ups Reintentalo!",
            subHeader: '',
            message: 'Sin un mail o telefono registrado no podemos identificarte.',
            buttons: ['OK']
          });
      
          await alert.present().then(() => {
          this.navCtrl.navigateRoot("ingreso");
          })
        });
      }).catch(err=>{
          console.log(err);
      });
    }
    else{
      await this.presentAlert().then(() => {
        this.navCtrl.navigateRoot("ingreso");
      })
    }
    return;
    
    
   
  }
  public ofus;
  ofuscar_cel(cel) {
    if (!cel) {
      return cel;
    }
    console.log((cel.length) - 4);
    console.log();

    return "".padStart(cel.length - 4, "*") + cel.substr(cel.length - 4, cel.length);
  }
  ofuscar(usuario) {
    // return usuario:
    if (usuario == undefined) {
      return usuario;
    }
    console.log(usuario);
    let usu: string = usuario.split("@");
    console.log(usu);
    this.ofus = usu[0].substr(0, 1) + "".padStart((usu[0].length) - 2, "*") + usu[0].substr(usu[0].length - 1, usu[0].length) + "@" + usu[1];
    return this.ofus;
  }
  EnviarCodigo() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ email: this.mail, logued: p.logued, selectmail: this.selectmail, selectTel: this.selectTel, ofus: this.ofus, cel: this.celular,ofustel:this.ofuscar_cel(this.celular) })
      }
    }
    this.navCtrl.navigateForward("lostpassword1", navigationExtras);
  }
}
