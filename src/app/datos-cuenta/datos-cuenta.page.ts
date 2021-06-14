import { UsuarioService } from '../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-datos-cuenta',
  templateUrl: './datos-cuenta.page.html',
  styleUrls: ['./datos-cuenta.page.scss'],
})
export class DatosCuentaPage implements OnInit {
  readonly = "true";
  public iniciales="";
  public username="";
  public nombre="";
  public apellido="";
  public dni="";
  public sexo="";
  public nacionalidad="";
  public fecha_nac="";
  public cuil="";
  public domicilio="";
  public email="";
  public celular="";
  
  constructor(private navCtrl: NavController, public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.obtener_mis_datos().then((data: any) => {
      console.log(data);
      this.username = data.nombre_completo;
      this.iniciales = data.nombre_completo
        .split(' ')
        .map(it => it.charAt(0))
        .slice(0, 1)
        .join('')
        + data.nombre_completo
          .split(' ')
          .map(it => it.charAt(0))
          .slice(2, 3)
          .join('');
      //     console.log(data.codArea+ data.celular);
        this.celular = data.cod_area+data.celular;
        this.email = data.email;
        this.apellido = data.apellido;
        this.nombre = data.nombre;
        this.dni = data.dni;
        this.sexo = data.sexo == "M" ? "Masculino":"Femenino";
        this.nacionalidad = data.nacionalidad;
        this.fecha_nac = data.fecha_nac;
        this.cuil = data.cuil;
        this.domicilio = data.direccion;
        this.nacionalidad = data.nacionalidad;
        // this.
      // localStorage.setItem("nombre",this.username);
      // localStorage.setItem("iniciales",this.iniciales);
      // console.log(this.username);
    });

  }
  EditarCel(){

  }
}
