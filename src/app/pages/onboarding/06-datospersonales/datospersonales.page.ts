import { RenaperService } from '../../../service/renaper.service';
import { Onboarding_vars } from '../../../classes/onboarding-vars';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.page.html',
  styleUrls: ['./datospersonales.page.scss'],
})
export class DatospersonalesPage implements OnInit {

  constructor(private navCtrl: NavController, public renaper: RenaperService, public route: ActivatedRoute, public Router: Router) { }

  readonly = "true";
  public apellido;
  public nombre;
  public fec_nac;
  public sexo;
  public nacionalidad;
  public provincia;
  public ciudad;
  public cod_postal;
  public direccion;
  public numero;
  public piso;
  public depto;
  public cuit;
  public nombre_completo;
  public dni;
  public cargando = true;
  public pfpj;

  /*Control */
  public nombre_completo_pedir;
  public sexo_pedir;
  public fec_nac_pedir;
  public nacionalidad_pedir;
  public dni_pedir;

  /*fin variables de control */
  ngOnInit() {
    localStorage.setItem("onboardingLastPage","datospersonales");

    let  p  = Onboarding_vars.get();
    // p["politico_expuesto"]= (this.form.pe_no)? !this.form.pe_no : this.form.pe_si;
    // p["sujeto_obligado"]=(this.form.so_no)? !this.form.so_no : this.form.so_si
    // p["fatca"]=(this.form.fat_no)? !this.form.fat_no : this.form.fat_si
    // localStorage.setItem("varsOnboarding",JSON.stringify(p));
    // let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p != null) {
      this.dni = p.dni;
      this.sexo = p.sexo;
      this.pfpj=p.pfpj;
      this.apellido=p.apellido
      this.sexo=p.sexo
      this.nombre=p.nombre
      this.nombre_completo=p.nombre_completo
      this.fec_nac=p.fecha_nac;
      this.nacionalidad=p.nacionalidad;
      this.provincia=p.provincia
      this.ciudad=p.ciudad
      this.cod_postal=p.cod_postal
      this.direccion=p.direccion
      this.numero=p.numero
      this.piso=p.piso
      this.depto=p.depto
      this.cuit=p.cuit;
      this.dni=p.documento;
      if(this.pfpj=="pf")
      this.renaper.validar_dni(p.documento||p.dni, p.sexo).then(data => {
        console.log(data);
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
        this.cuit = data.cuil;
        this.pfpj=data.pfpj;
        this.cargando=false;
        this.pedir();
      })
        .catch(err=>{
          this.nombre_completo=p.nombre;
          this.sexo=p.sexo;
          this.fec_nac=p.fecha_nac;
          console.log(p.fecha_nac);
          this.pedir();
          this.cargando=false;
      });
      else{
        this.cargando=false;
        this.pedir();
      }
    }
    

  }

pedir(){
    this.nombre_completo_pedir = this.nombre_completo==undefined;
    this.dni_pedir=this.dni==undefined;
    this.sexo_pedir = this.sexo==undefined;
    this.fec_nac_pedir = this.fec_nac==undefined;
    this.nacionalidad_pedir = this.nacionalidad==undefined;
}

  Continuar() {
    let  vars  = Onboarding_vars.get();
    let  p = {};
    p["apellido"] = this.apellido;
    p["sexo"] = this.sexo;
    p["nombre"] = this.nombre;
    p["nombre_completo"] = this.nombre_completo
    p["fecha_nac"] = this.fec_nac
    p["nacionalidad"] = this.nacionalidad;
    p["provincia"] = this.provincia;
    p["ciudad"] = this.ciudad;
    p["cod_postal"] = this.cod_postal;
    p["direccion"] = this.direccion;
    p["numero"] = this.numero;
    p["piso"] = this.piso;
    p["depto"] = this.depto;
    p["cuit"] = this.cuit;
    
    Onboarding_vars.add(p);
    if(this.pfpj=="pf")
      this.navCtrl.navigateForward("datospersonales1");
    else if(this.pfpj=='pj'){
      this.navCtrl.navigateForward("datospersonales2");
    }
    
  }
  Editar() {
    this.readonly = "false";

  }
}
