import { ValidacionCelService } from '../service/validacion-cel.service';
import { LoginBoService } from '../service/login-bo.service';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro1',
  templateUrl: './registro1.page.html',
  styleUrls: ['./registro1.page.scss'],
})
export class Registro1Page implements OnInit {
  @ViewChild("cod_pais") cod_pais:ElementRef;
  public params;
  public codigo;
  public cargando=false;
  public errorCod=false;
  public errorCel=false;
  public codArea;
  public celular;
  public dni;
  public pfpj;
  constructor(public route: ActivatedRoute, public router: Router,private navCtrl : NavController,public validCel:ValidacionCelService,public loginBo:LoginBoService) {}

  ngOnInit() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    this.pfpj=p.pfpj;
  }
  async ConfirmaSms(){
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    this.pfpj=p.pfpj;
    let proceso_alta = localStorage.getItem("proceso_alta");
      await this.loginBo.login().then(async token=>{
        console.log("logueado");
        console.log(this.obtener_codigo_pais()+this.codArea+this.celular);
        console.log(this.codArea);
        this.cargando=true;
          await this.validCel.obtener_codigo(this.obtener_codigo_pais()+this.codArea.toString()+this.celular.toString(),token).then( data=>{
          //   console.log("codigo enviado");
            const navigationExtras: NavigationExtras = {
              queryParams: {
                param: JSON.stringify({email:p.email,password:p.password,acepta:p.acepta,cod_pais:this.obtener_codigo_pais(),cod_area:this.codArea,celular:this.celular,dni:this.dni,pfpj:p.pfpj,proceso_alta:p.proceso_alta})
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

  obtener_codigo_pais(){
    console.log(this.cod_pais.nativeElement.innerHTML);
    return this.cod_pais.nativeElement.innerHTML.replace("+","");
  }
  validar_celular(){
    
    let result = (this.obtener_codigo_pais()+this.codArea+this.celular).match(/^[+]?[0-9]{2}([0-9]{2}[0-9]{8})$/);
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
