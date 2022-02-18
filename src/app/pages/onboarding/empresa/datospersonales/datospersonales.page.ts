import { DatospersonalesPage as DP } from '../../persona/06-datospersonales/datospersonales.page';
import { Onboarding_vars } from '../../../../classes/onboarding-vars';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-datospersonales',
    templateUrl: './datospersonales.page.html',
    styleUrls: ['./datospersonales.page.scss'],
})

export class DatospersonalesPage extends DP {

    async ngOnInit() {
        if (this.platfrom.is("cordova"))
            await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then();
        localStorage.setItem("onboardingLastPage", "datospersonales");
        this.obtener_paises();
        let p = Onboarding_vars.get();
        console.log(p);
        
        if (p != null) {
            this.dni = p.dni || p.documento;
            this.sexo = p.sexo;
            this.pfpj = p.pfpj;
            this.apellido = p.apellido
            this.sexo = p.sexo
            this.nombre = p.nombre
            this.nombre_completo = p.nombre_completo
            this.fec_nac = p.fecha_nac;
            this.nacionalidad = p.nacionalidad;
            this.provincia = p.provincia
            this.ciudad = p.ciudad
            this.cod_postal = p.cod_postal
            this.direccion = p.direccion
            this.numero = p.numero
            this.piso = p.piso
            this.depto = p.depto
            this.cuit = p.cuit;
            this.cargando = false;
            // this.dni = null;
            this.pedir();
        }


    }
    Continuar() {
        let vars = Onboarding_vars.get();
        let p = {};
        p["apellido"] = this.apellido;
        p["sexo"] = this.sexo;
        p["nombre"] = this.nombre;
        p["nombre_completo"] = this.nombre_completo
        p["fecha_nac"] = this.fec_nac
        p["nacionalidad"] = this.nacionalidad;
        p["cod_postal"] = this.cod_postal;
        p["direccion"] = this.direccion;
        p["numero"] = this.numero;
        p["piso"] = this.piso;
        p["depto"] = this.depto;
        p["cuit"] = this.cuit;
        p["relacion"] = this.relacion;
        Onboarding_vars.add(p);
        this.navCtrl.navigateForward("empresa/datospersonales-empresa1");
    
      }
}
