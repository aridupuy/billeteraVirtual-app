import { Datospersonales1Page as DP1} from '../../persona/07-datospersonales1/datospersonales1.page';
import { Onboarding_vars } from '../../../../classes/onboarding-vars';
import { Component, OnInit } from '@angular/core';
import { calculaCuil } from 'src/app/classes/CalculaCuil';

@Component({
  selector: 'app-datospersonales1',
  templateUrl: './datospersonales1.page.html',
  styleUrls: ['./datospersonales1.page.scss'],
})
export class Datospersonales1Page extends DP1 {
  public dni_modificado

  async ngOnInit(){
    localStorage.setItem("onboardingLastPage", "datospersonales1");
    if (this.platfrom.is("cordova"))
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then();
    let p = Onboarding_vars.get();
    if (p != null) {
      this.dni = p.documento;
      this.sexo = p.sexo;
      this.pfpj = p.pfpj;
    }
  }

  validar_dni(){
    if(this.dni_modificado==undefined || this.dni_modificado.length<8){
      return false;
    }
    let p = Onboarding_vars.get();
    console.log(this.sexo);
    this.renaper.validar_dni(this.dni_modificado, p.sexo).then(data => {
      console.log(JSON.stringify(data));
      this.apellido = data.apellido;
      this.nombre = data.nombres;
      this.nombre_completo = data.nombres + " " + data.apellido;
      this.fec_nac = data.fecha_nacimiento;
      this.sexo = data.sexo;
      this.nacionalidad = data.nacionalidad;
      this.provincia = data.provincia;
      this.ciudad = data.ciudad;
      this.cod_postal = data.codigo_postal;
      this.direccion = data.calle;
      this.numero = data.numero;
      this.piso = data.piso;
      this.depto = data.departamento;

      let cuit;
      if (data["cuit"] != undefined) {
        cuit = data.cuit;
      }
      else {
        cuit = data.cuil;
      }
      this.cuit1 = cuit.substr(0, 2);
      this.cuit2 = cuit.substr(cuit.length - 1, 1);
    }).catch(err => {
      if (p.cuit || p.cuil) {
        this.cuit1 = p.cuit ? p.cuit.substr(0, 2) : p.cuil ? p.cuil.substr(0, 2) : "";
        this.cuit2 = p.cuit ? p.cuit.substr(p.cuit.length - 1, 1) : p.cuil ? p.cuil.substr(p.cuil.length - 1, 1) : "";
      }
      else {
        let calculo = new calculaCuil();
        let cuil: String = calculo.getCuilCuit(this.dni_modificado, this.sexo || "S").toString();
        this.cuit1 = cuil.substring(0, 2);
        // this.cuit2 = cuil.substring(cuil.length - 1, 1);
        this.cuit2=cuil.substring((cuil.length-1),cuil.length);
        console.log(cuil);
      }
      console.log(err);
    });
  }


  Continuar() {

    let vars = Onboarding_vars.get();
    // localStorage.setItem("varsOnboarding",JSON.stringify(p));
    let p = {};

    p["ocupacion"] = this.ocupacion;
    p["estado_civil"] = this.estadoCivil;
    p["persona_cuil"] = this.cuit1 + this.dni_modificado + this.cuit2
    p["persona_dni"] = this.dni_modificado;
    p["persona_sexo"] = this.sexo;
    p["persona_nombre"] = this.nombre;
    p["persona_apellido"] = this.apellido;
    Onboarding_vars.add(p);
    this.navCtrl.navigateForward("empresa/datospersonales2");

  }
}
