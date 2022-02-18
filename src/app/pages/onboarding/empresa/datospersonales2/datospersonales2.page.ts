import { Datospersonales2Page as DP2} from '../../persona/09-datospersonales2/datospersonales2.page';
import { Onboarding_vars } from '../../../../classes/onboarding-vars';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-datospersonales2',
  templateUrl: './datospersonales2.page.html',
  styleUrls: ['./datospersonales2.page.scss'],
})
export class Datospersonales2Page extends DP2 {
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
     if(!p.cuit_modificado)
      p.cuit_modificado=p.cuit || p.cuil;
    this.registroService.registrar_empresa(p.mail,p.nombre_completo,p.password,p.valido_sms,p.terminos_acepta,p.cod_area,p.celular,p.foto_frente,
      p.foto_frente_con_dni,p.foto_dorso_dni,p.foto_frente_dni,p.documento,p.fecha_nac,p.nacionalidad,p.sexo,p.estado_civil,p.ocupacion,p.provincia,
      p.ciudad,this.cod_postal,calle,altura,piso,depto,p.fatca,p.politico_expuesto,p.sujeto_obligado,p.cuit || p.cuil ,p.cuit_modificado,p.pfpj,
      p.proceso_alta,p.usuario,p.relacion,
      p.persona_dni,p.persona_apellido,p.persona_nombre,p.persona_cuil,p.persona_sexo,this.calle_mod,this.altura_mod,this.piso_mod,this.depto_mod,this.cod_postal,this.provincia,this.ciudad,
      p.altura_empresa,p.calle_empresa,p.ciudad_empresa,p.cod_postal_empresa,p.depto_empresa,p.piso_empresa,p.provincia_empresa
      ).then(data=>{
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

}
