import { ContactoService } from '../service/contacto.service';
import { Icontacto } from '../interfaces/Icontacto';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.page.html',
  styleUrls: ['./lista-amigos.page.scss'],
})

export class ListaAmigosPage implements OnInit {
  public monto_escrito;
  public monto;
  public ultimos = [];
  public ultimos_back = [];
  public busqueda;
  public resultados;
  public buscando = false;
  public sinResutados = false
  public amigos = [];
  constructor(public contacto: ContactoService, private navCtrl: NavController) { }
  ngOnInit() {

    this.contacto.obtener_ultimos_contactos().then((data: Icontacto[]) => {
      console.log(data);
      data.forEach(d => {
        d.iniciales = this.iniciales(d.nombre);
        d.marcado = 0;
      });
      this.ultimos = data;
      this.ultimos_back = this.ultimos;
    }).catch(err => {
      console.log(err);
      this.sinResutados=true;
    });
    this.amigos=[];

  }
  agregarAmigo() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ envio: false })
      }
    };
    console.log(navigationExtras);
    console.log("agregar-amigo");
    this.navCtrl.navigateRoot("agregar-amigo",navigationExtras);
  }
  buscar(event) {
    console.log(this.busqueda);
    this.ultimos = this.ultimos_back.filter(element => {
      console.log(element.nombre.toLowerCase().search(this.busqueda.toLowerCase()));
      if (element.nombre.toLowerCase().search(this.busqueda.toLowerCase()) < 0)
        return false;
      return true;
    });
    if (this.ultimos.length == 0) {
      this.sinResutados = true;

    } else {
      this.sinResutados = false;
    }
    if (this.busqueda.length == 0) {
      this.ultimos = this.ultimos_back;
      this.sinResutados = false;
    }
  }
  iniciales(nombre) {
    return nombre
      .split(' ')
      .map(it => it.charAt(0))
      .slice(0, 1)
      .join('')
      + nombre
        .split(' ')
        .map(it => it.charAt(0))
        .slice(2, 3)
        .join('');
  }
  Continuar() {
    this.navCtrl.navigateForward(["pedir-amigo-desdelista", {}]);
  }
  pedir() {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ var: this.amigos })
      }
    };
    console.log(navigationExtras);
    // this.modalCtrl.dismiss();
    this.navCtrl.navigateForward("pedir-amigo-desdelista", navigationExtras);

  }

  marcar(resultado:Icontacto) {
    console.log("MARCANDO");
    let contactos = this.amigos;
    this.amigos = [];
    var esta = false;
    if(contactos .length == 0){
      console.log("VACIO");
      console.log(this.amigos.length);
      resultado.marcado = 1;
      resultado.iniciales = this.iniciales(resultado.nombre);
      this.amigos.push(resultado);
      return false;
    }
    
    contactos.forEach((cont) => {
      console.log(cont.id == resultado.id);
      console.log(cont.id);
      console.log(resultado.id);
      if(!esta)
        if (cont.id == resultado.id) {
          console.log("ESTA");
          esta=true;
        } else {
          esta=false;
        }
    });
    if(esta){
      console.log("SACO");
      resultado.marcado = 0;
      var i = contactos.indexOf( resultado );
      if ( i !== -1 ) {
          contactos.splice( i, 1 );
      }
      this.amigos = contactos;
    }
    else{
      resultado.marcado = 1;
      resultado.iniciales = this.iniciales(resultado.nombre);
      this.amigos = contactos;
      console.log("AGREGO");
      this.amigos.push(resultado);
    }
    console.log(this.amigos);
  }
  desmarcar(resultado) {
    console.log(resultado);
    this.amigos.reduce((item) => {
      console.log(item);
      if (item.id == resultado.id)
        return false;
    })
  }
}
