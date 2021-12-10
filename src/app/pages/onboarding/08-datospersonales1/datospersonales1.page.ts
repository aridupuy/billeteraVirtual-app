import { RenaperService } from '../../../service/renaper.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-datospersonales1',
  templateUrl: './datospersonales1.page.html',
  styleUrls: ['./datospersonales1.page.scss'],
})
export class Datospersonales1Page implements OnInit {
  @ViewChild('cuil1') cuil1;
  @ViewChild('cuil2') cuil2;
  values:any=[];
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

  

  constructor(private navCtrl : NavController,public route: ActivatedRoute, public Router: Router,public renaper:RenaperService) {}

  ngOnInit() {
    localStorage.setItem("onboardingLastPage","datospersonales1");
    let  p  = JSON.parse(localStorage.getItem("varsOnboarding"));
    if (p != null) {
      this.dni = p.dni;
      this.sexo = p.sexo;
      this.pfpj=p.pfpj;
      this.renaper.validar_dni(p.dni, p.sexo).then(data => {
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
        if(data["cuit"]!=undefined){
          cuit = data.cuit; 
        }
        else{
          cuit = data.cuil; 
        }
        this.cuit1 = cuit.substr(0,2);
        this.cuit2 = cuit.substr(cuit.length-1,1);
      }).catch((err)=>{
          console.log(err);
        });
    }
  }
  onKeyUp(event,index){  
    console.log(event);
    if(event.target.value.length !=2){
      this.setFocus(index-2);  
    }else{
      this.values.push(event.target.value);  
      this.setFocus(index);   
    }
    event.stopPropagation();
  }
  setFocus(index){
       
    switch(index){
      case 0:
      this.cuil1.setFocus();
      break;
      case 1:
      this.cuil2.setFocus();
      break;
      }
  }
  
  OpcionSeleccionada(event,index) {
    const selector = document.querySelectorAll(".option-round")
    selector.forEach((element)=>{
      if(element.getAttribute("ds-data")==index){
        element.classList.remove("activo")
      }
      
    });
    // console.log(selector);
    switch(index){
      case 1 :
        this.estadoCivil = event.srcElement.innerText;
        break;
      case 2 : 
        this.ocupacion = event.srcElement.innerText;
      break;

    }
    event.srcElement.classList.toggle("activo");
    // console.log(event);
    
  }
  Continuar(){

    let  p  = JSON.parse(localStorage.getItem("varsOnboarding"));
    // localStorage.setItem("varsOnboarding",JSON.stringify(p));

    p["ocupacion"] = this.ocupacion;
    p["estado_civil"] = this.estadoCivil;
    p["cuil_modificado"] = this.cuit2 + p.dni + this.cuit2
    p["direccion"] = this.direccion;
    p["numero"] = this.numero
    p["piso"] = this.piso
    p["depto"] = this.depto
    p["piso"] = this.piso
    p["sexo"] = this.sexo
    p["nacionalidad"] = this.nacionalidad
    p["provincia"] = this.provincia
    p["ciudad"] = this.ciudad
    p["dni"] = this.dni
    p["fec_nac"] = this.fec_nac
    p["nombre_completo"] = this.nombre_completo
    p["nombre"] = this.nombre
    p["apellido"] = this.apellido
    
    if(p.cuil_modificado ==null){
      p.cuit_modificado = p.cuit;
    }
    
    localStorage.setItem("varsOnboarding",JSON.stringify(p));
    
    this.navCtrl.navigateForward("datospersonales2");
    
  }

}
