import { RenaperService } from '../../../service/renaper.service';
import { RegistroService } from '../../../service/registro.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-datospersonales2',
  templateUrl: './datospersonales2.page.html',
  styleUrls: ['./datospersonales2.page.scss'],
})
export class Datospersonales2Page implements OnInit {

  constructor(private navCtrl: NavController, public route: ActivatedRoute, public Router: Router, public registroService:RegistroService) { }

  readonly = "true";
  public calle;
  public altura;
  public piso;
  public depto;
  public calle_mod;
  public altura_mod;
  public piso_mod;
  public depto_mod;
  public modificar = false;
  public condatos=false;
  public cod_postal=false;
  public act_cod_postal=true;
  ngOnInit() {
    localStorage.setItem("onboardingLastPage","datospersonales2");
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(JSON.stringify(p));
    this.calle = p.direccion;
    this.altura = p.numero;
    this.piso = p.piso;
    this.depto = p.depto;
    this.modificar=true;
    this.cod_postal=p.cod_postal;
    this.act_cod_postal=!p.cod_postal==undefined;
    if(this.calle && this.altura){
      this.condatos = true;
      this.modificar=false;
    }
  }
  Continuar() {
    let  p  = JSON.parse(localStorage.getItem("varsOnboarding"));
    // localStorage.setItem("varsOnboarding",JSON.stringify(p));

    // console.log(p);
    let calle=this.calle==undefined?this.calle_mod:this.calle;
    let altura=this.altura==undefined?this.altura_mod:this.altura;
    let depto=this.depto==undefined?this.depto_mod:this.depto;
    let piso=this.piso==undefined?this.piso_mod:this.piso;
    
    

    this.registroService.registrar(p.email,p.nombre_completo,p.password,p.valido_sms,p.acepta,p.cod_area,p.celular,p.foto_frente,p.foto_frente_con_dni,p.foto_dorso_dni,p.foto_frente_dni,p.cuit,p.fecha_nac,p.nacionalidad,p.sexo,p.estado_civil,p.ocupacion,p.provincia,p.ciudad,this.cod_postal,calle,altura,piso,depto,p.fatca,p.politico_expuesto,p.sujeto_obligado,p.cuit,p.cuit_modificado,p.pfpj,p.proceso_alta).then(data=>{
    let mensaje_titulo = "¡Todo un éxito!";
    let mensaje = "Ahora podés iniciar sesión y comenzar a disfrutar de todos los beneficios de llevar tu billetera en el celular."
    let mensaje2 = "Ya completaste tu registro";  
    const navigationExtras: NavigationExtras = {
        queryParams: {
          param: JSON.stringify({mensaje:mensaje, mensaje_titulo:mensaje_titulo,valido:true})
        }
      }
      this.navCtrl.navigateForward("registrofinalizado",navigationExtras);
    }).catch(error=>{
      const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({mensaje:"Ocurrio un error al crear tu cuenta por favor Intenta mas tarde.", mensaje_titulo:"Tu cuenta NO Fue creada",valido:false})
      },
    };
      this.navCtrl.navigateForward("registrofinalizado",navigationExtras);
    })




    // let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    // if(this.calle_mod && this.calle!=this.calle_mod){
    //   p["direccion_mod"] = this.calle;  
    // }
    // if(this.piso!=this.piso_mod){
    //   p["piso_mod"] = this.piso_mod;  
    // }
    // if(this.altura!=this.altura_mod){
    //   p["numero_mod"] = this.altura_mod;  
    // }
    // if(this.depto!=this.depto_mod){
    //   p["depto_mod"] = this.depto_mod;  
    // }
    
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     param: JSON.stringify(p)
    //   },
    //   replaceUrl: true
    // };
    // this.navCtrl.navigateForward("registrofinalizado", navigationExtras);
  }
  Editar() {
    this.readonly = "false";

  }
}
