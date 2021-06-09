import { RenaperService } from '../service/renaper.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p != null) {
      this.dni = p.dni;
      this.sexo = p.sexo;
      this.renaper.validar_dni(p.dni, p.sexo).then(data => {
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
        this.cargando=false;
      });
    }
  }
  Continuar() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p == null)
      p = {};
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
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      },
      replaceUrl: true
    };
    this.navCtrl.navigateForward("datospersonales1", navigationExtras);
  }
  Editar() {
    this.readonly = "false";

  }
}
