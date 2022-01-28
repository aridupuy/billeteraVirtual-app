import { RenaperService } from '../../../../service/renaper.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Onboarding_vars } from 'src/app/classes/onboarding-vars';
import { calculaCuil } from '../../../../classes/CalculaCuil';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-datospersonales1',
  templateUrl: './datospersonales1.page.html',
  styleUrls: ['./datospersonales1.page.scss'],
})
export class Datospersonales1Page implements OnInit {
  @ViewChild('cuil1') cuil1;
  @ViewChild('cuil2') cuil2;
  values: any = [];
  public dni;
  public cuit1;
  public cuit2;
  public estadoCivil;
  public ocupacion;

  public apellido;
  public nombre;
  public nombre_completo;
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
  public pfpj;



  constructor(public platfrom: Platform, public screenOrientation: ScreenOrientation, protected navCtrl: NavController, public route: ActivatedRoute, public Router: Router, public renaper: RenaperService) { }

  async ngOnInit() {
    localStorage.setItem("onboardingLastPage", "datospersonales1");
    if (this.platfrom.is("cordova"))
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then();
    let p = Onboarding_vars.get();
    if (p != null) {
      this.dni = p.documento;
      this.sexo = p.sexo;
      this.pfpj = p.pfpj;
      this.renaper.validar_dni(this.dni, p.sexo).then(data => {
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
          let cuil: String = calculo.getCuilCuit(this.dni, this.sexo || "S").toString();
          this.cuit1 = cuil.substring(0, 2);
          // this.cuit2 = cuil.substring(cuil.length - 1, 1);
          this.cuit2=cuil.substring((cuil.length-1),cuil.length);
          console.log(cuil);
        }
        this.nombre = p.nombre;
        this.fec_nac = p.fecha_nac;
        this.sexo = p.sexo;
        this.nacionalidad = p.nacionalidad;
        console.log(err);
      });
    }
  }
  onKeyUp(event, index) {
    console.log(event);
    if (event.target.value.length != 2) {
      this.setFocus(index - 2);
    } else {
      this.values.push(event.target.value);
      this.setFocus(index);
    }
    event.stopPropagation();
  }
  setFocus(index) {

    switch (index) {
      case 0:
        this.cuil1.setFocus();
        break;
      case 1:
        this.cuil2.setFocus();
        break;
    }
  }

  OpcionSeleccionada(event, index) {
    const selector = document.querySelectorAll(".option-round")
    selector.forEach((element) => {
      if (element.getAttribute("ds-data") == index) {
        element.classList.remove("activo")
      }

    });
    // console.log(selector);
    switch (index) {
      case 1:
        this.estadoCivil = event.srcElement.innerText;
        break;
      case 2:
        this.ocupacion = event.srcElement.innerText;
        break;

    }
    event.srcElement.classList.toggle("activo");
    // console.log(event);

  }
  Continuar() {

    let vars = Onboarding_vars.get();
    // localStorage.setItem("varsOnboarding",JSON.stringify(p));
    let p = {};

    p["ocupacion"] = this.ocupacion;
    p["estado_civil"] = this.estadoCivil;
    p["cuit_modificado"] = this.cuit1 + vars.documento + this.cuit2

    Onboarding_vars.add(p);
    this.navCtrl.navigateForward("datospersonales2");

  }

}
