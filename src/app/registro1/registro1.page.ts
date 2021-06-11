import { ValidacionCelService } from '../service/validacion-cel.service';
import { LoginBoService } from '../service/login-bo.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro1',
  templateUrl: './registro1.page.html',
  styleUrls: ['./registro1.page.scss'],
})
export class Registro1Page implements OnInit {
  public params;
  public codigo;
  public cargando=false;
  public errorCod=false;
  public errorCel=false;
  public codArea;
  public celular;
  public dni;
  constructor(public route: ActivatedRoute, public router: Router,private navCtrl : NavController,public validCel:ValidacionCelService,public loginBo:LoginBoService) {}

  ngOnInit() {
  }
  async ConfirmaSms(){
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    let proceso_alta = localStorage.getItem("proceso_alta");
      await this.loginBo.login().then(async token=>{
        console.log("logueado");
        console.log(this.codArea+this.celular);
        console.log(this.codArea);
        this.cargando=true;
          await this.validCel.obtener_codigo(this.codArea.toString()+this.celular.toString(),token).then( data=>{
          //   console.log("codigo enviado");
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({email:p.email,password:p.password,acepta:p.acepta,cod_area:this.codArea,celular:this.celular,dni:this.dni})
              }
            };
            // console.log(navigationExtras);
            this.cargando=false;
            this.navCtrl.navigateForward("confirmasms", navigationExtras);
          })
          .catch(err=>{console.log(err); return;});
        });
    // this.navCtrl.navigateForward(["confirmasms",{}]);
  }
  validar_celular(){
    
    let result = (""+this.codArea+this.celular).match(/^[+]?[0-9]{2}([0-9]{2}[0-9]{8})$/);
    if(result!==null){
        this.errorCel=false;
    }
    else{
      this.errorCel=true;
    }
    }
  ionViewDidLeave(){
   this.codigo=null;
  }
}
