import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Icontacto } from '../interfaces/Icontacto';
import { ContactoService } from '../service/contacto.service';

@Component({
  selector: 'app-lista-destinatarios',
  templateUrl: './lista-destinatarios.page.html',
  styleUrls: ['./lista-destinatarios.page.scss'],
})
export class ListaDestinatariosPage implements OnInit {
  public monto_escrito;
  public monto;
  public ultimos = [];
  public ultimos_back = [];
  public busqueda;
  public resultados;
  public buscando = false;
  public sinResutados = false
  public destinatarios = [];
  constructor(public contacto: ContactoService, private navCtrl: NavController) { }
  ngOnInit() {

    this.contacto.obtener_ultimos_contactos().then((data: Icontacto[]) => {
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
    this.destinatarios=[];

  }
  agregardestinatario() {
    console.log("agregar-destinatario");
    this.navCtrl.navigateRoot("agregar-destinatario");
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
    this.navCtrl.navigateForward(["pedir-destinatario-desdelista", {}]);
  }
  pedir() {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ var: this.destinatarios })
      }
    };
    console.log(navigationExtras);
    // this.modalCtrl.dismiss();
    this.navCtrl.navigateForward("pedir-destinatario-desdelista", navigationExtras);

  }

  marcar(resultado:Icontacto) {
    console.log("MARCANDO");
    let contactos = this.destinatarios;
    this.destinatarios = [];
    var esta = false;
    if(contactos .length == 0){
      console.log("VACIO");
      console.log(this.destinatarios.length);
      resultado.marcado = 1;
      resultado.iniciales = this.iniciales(resultado.nombre);
      this.destinatarios.push(resultado);
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
      this.destinatarios = contactos;
    }
    else{
      resultado.marcado = 1;
      resultado.iniciales = this.iniciales(resultado.nombre);
      this.destinatarios = contactos;
      console.log("AGREGO");
      this.destinatarios.push(resultado);
    }
    console.log(this.destinatarios);
  }
  desmarcar(resultado) {
    console.log(resultado);
    this.destinatarios.reduce((item) => {
      console.log(item);
      if (item.id == resultado.id)
        return false;
    })
  }

}
