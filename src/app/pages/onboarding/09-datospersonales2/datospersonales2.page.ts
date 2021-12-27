import { RenaperService } from '../../../service/renaper.service';
import { RegistroService } from '../../../service/registro.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
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
    let p = Onboarding_vars.get();
    console.log(p);
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
    let  p  = Onboarding_vars.get();
    // localStorage.setItem("varsOnboarding",JSON.stringify(p));

    // console.log(p);
    let calle=this.calle_mod!==undefined?this.calle_mod:this.calle;
    let altura=this.altura_mod!==undefined?this.altura_mod:this.altura;
    let depto=this.depto_mod!==undefined?this.depto_mod:this.depto;
    let piso=this.piso_mod!==undefined?this.piso_mod:this.piso;
    
    Onboarding_vars.add({direccion:calle,numero:altura,depto:depto,piso:piso,cod_postal:this.cod_postal});
     p  = Onboarding_vars.get();
    this.registroService.registrar(p.mail,p.nombre_completo,p.password,p.valido_sms,p.terminos_acepta,p.cod_area,p.celular,p.foto_frente,p.foto_frente_con_dni,p.foto_dorso_dni,p.foto_frente_dni,p.documento,p.fecha_nac,p.nacionalidad,p.sexo,p.estado_civil,p.ocupacion,p.provincia,p.ciudad,this.cod_postal,calle,altura,piso,depto,p.fatca,p.politico_expuesto,p.sujeto_obligado,p.cuit || p.cuil ,p.cuit_modificado,p.pfpj,p.proceso_alta,p.usuario).then(data=>{
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
        param: JSON.stringify({mensaje:error, mensaje_titulo:"Tu cuenta NO Fue creada",valido:false})
      },
    };
      this.navCtrl.navigateForward("registrofinalizado",navigationExtras);
    })
  }
  Editar() {
    this.readonly = "false";

  }
}
