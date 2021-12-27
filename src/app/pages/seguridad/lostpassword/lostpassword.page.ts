import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginBoService } from '../../../service/login-bo.service';
import { InicioProcesoService } from '../../../service/inicio-proceso.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.page.html',
  styleUrls: ['./lostpassword.page.scss'],
})
export class LostpasswordPage implements OnInit {
  ToggleIconMail = 'mail-outline';
  ToggleIconTel = 'chatbox-ellipses-outline';
  usuario :string;
  logued : boolean;
  telefono :string;
  selectmail :boolean= false;
  selectTel :boolean= false;
  mail:string;
  celular:string;
  SeleccionadoMail() {
    const selectorMail = document.querySelector("#mail")
    selectorMail.classList.toggle("activo")
    if (selectorMail.classList.contains("activo")) {
      this.ToggleIconMail = 'checkmark-outline';
      this.selectmail = true;
    }
    else{
      this.selectmail = false;
      this.ToggleIconMail = 'mail-outline';
    }
  }
  SeleccionadoTel() {
    const selector = document.querySelector("#telefono")
    selector.classList.toggle("activo")
    if (selector.classList.contains("activo")) {
      this.selectTel = true;
      this.ToggleIconTel = 'checkmark-outline';
    }
    else{
      this.selectTel = false;
      this.ToggleIconTel = 'chatbox-ellipses-outline';
    }
    console.log("telefono",this.selectTel);
    console.log("mail",this.selectmail);
  }
  constructor(private navCtrl : NavController,public route: ActivatedRoute,public pocesoalta:InicioProcesoService,protected loginbo:LoginBoService,public alertController: AlertController) {
   
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
    console.log(p.usuario);
    if(p==undefined || p.usuario==undefined || p.usuario==""){
      await this.presentAlert().then(()=>{
        this.navCtrl.navigateRoot("ingreso");
      })
      return;
    }
    this.loginbo.login().then(token=>{
      this.pocesoalta.obtener_datos(p.usuario,token).then((data:{cel:string,mail:string})=>{
        this.mail=data.mail;
        this.celular=data.cel;
      })
    })
  }
  public ofus;
  ofuscar_cel(cel){
    if(!cel){
      return cel;
    }
    console.log((cel.length)-4);
    console.log();
    
    return "".padStart(cel.length-4,"*")+cel.substr(cel.length-4,cel.length);
  }
  ofuscar(usuario){
    // return usuario:
    if(usuario==undefined){
      return usuario;
    }
    console.log(usuario);
    let usu:string = usuario.split("@");
    console.log(usu);
    this.ofus = usu[0].substr(0,1)+"".padStart((usu[0].length)-2,"*")+usu[0].substr(usu[0].length-1,usu[0].length)+"@"+usu[1];
    return this.ofus;
  }
  EnviarCodigo(){
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({email:this.mail, logued:p.logued,selectmail:this.selectmail,selectTel:this.selectTel,ofus:this.ofus,cel:this.celular})
      }
    }
    this.navCtrl.navigateForward("lostpassword1",navigationExtras);
  }
}
