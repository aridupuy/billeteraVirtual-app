import { RenaperService } from '../service/renaper.service';
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
  constructor(private navCtrl : NavController,public route: ActivatedRoute, public Router: Router,public renaper:RenaperService) {}

  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if (p != null) {
      // this.dni = p.dni;
      // this.sexo = p.sexo;
      this.renaper.validar_dni(p.dni, p.sexo).then(data => {
      //   this.apellido = data.apellido;
      //   this.nombre = data.nombres;
      //   this.nombre_completo = data.nombres + " " + data.apellido;
      //   this.fec_nac = data.fecha_nacimiento;
      //   this.sexo = data.sexo;
      //   this.nacionalidad = data.nacionalidad;
      //   this.provincia = data.provincia;
      //   this.ciudad = data.ciudad;
      //   this.cod_postal = data.codigo_postal;
      //   this.direccion = data.calle;
      //   this.numero = data.numero;
      //   this.piso = data.piso;
      //   this.depto = data.departamento;
        this.dni = data.dni;
        this.cuit1 = data.cuit.substr(0,2);
        // this.dni = 
        this.cuit2 = data.cuit.substr(data.cuit.length-1,1);
        // console.log(this.dni);
        // console.log(this.cuit1);
        // console.log(this.cuit2);
      }).catch(()=>{
          this.dni = "35362389";
          this.cuit1 = "20353623894".substr(0,2);
          this.cuit2 = "20353623894".substr("20353623894".length-1,1);
          console.log(this.dni);
          console.log(this.cuit1);
          console.log(this.cuit2);
        });
    }else{
      this.dni = "35362389"
      
        
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

    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p);
    p["ocupacion"] = this.ocupacion;
    p["estado_civil"] = this.estadoCivil;
    p["cuil_modificado"] = this.cuit2 + p.dni + this.cuit2
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify(p)
      },
      replaceUrl: true
    };
    this.navCtrl.navigateForward("datospersonales2",navigationExtras);
  }

}
