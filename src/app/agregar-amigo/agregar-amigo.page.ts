
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { ContactoService } from '../service/contacto.service';
import { PedirAmigoDesdelistaPage } from '../pedir-amigo-desdelista/pedir-amigo-desdelista.page';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-agregar-amigo',
  templateUrl: './agregar-amigo.page.html',
  styleUrls: ['./agregar-amigo.page.scss'],
})
export class AgregarAmigoPage implements OnInit {
  public monto_escrito;
  public monto;
  public ultimos=[];
  public busqueda;
  public resultados;
  public buscando = false;
  public sinResutados = false
  public amigos = [];
  constructor(private contact: Contacts, private contacts: Contacts, public contacto: ContactoService, private navCtrl: NavController) { }
  public allContacts = [];
  ngOnInit(){};
  ionViewDidEnter() {
    this.contact.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true })
      .then(data => {
        /*ver como hacer mas optimo esto*/
        data.forEach((cont) => {
          // console.log(JSON.stringify(cont));
          if (cont.emails != null)
            cont.emails.forEach((email) => {
              // console.log(JSON.stringify(email));
              this.contacto.buscar_contactos(email.value).then((usuario:any[]) => {
                console.log(usuario);
                usuario.forEach(usu => {
                  usu["marcado"]=0;
                  console.log(usu);
                  this.allContacts.push(usu);
                });
                // 
                // console.log(JSON.stringify(usuario[0]));
                // 
              })
            })
            console.log(JSON.stringify(this.allContacts));
        })
        // console.log(JSON.stringify(this.allContacts));
        // = data
        console.log(JSON.stringify(this.allContacts));
      });
      this.contacto.obtener_ultimos_contactos().then((data:any[])=>{
        console.log(data);
        data.forEach(d=>{
            d["iniciales"]=this.iniciales(d.nombre);
          });
          this.ultimos=data;
      }).catch(err=>{
        console.log(err);
      });


  }
  agregarAmigo() {

  }
  buscar(event) {
    console.log(this.busqueda);
    this.buscando = true;
    this.sinResutados = false
    this.contacto.buscar_contactos(this.busqueda).then(data => {
      this.resultados = data;
      this.buscando = false;
      console.log(data);
    }).catch(err => {
      this.buscando = false;
      this.sinResutados = true
    });
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
  marcar(resultado) {
    resultado["marcado"] = 1;
    resultado["iniciales"] = this.iniciales(resultado.nombre);
    this.amigos.push(resultado);
  }
  desmarcar(resultado) {
    console.log(resultado);
    this.amigos.reduce((item) => {
      console.log(item);
      if (item.id == resultado.id)
        return false;
    })
  }
  ContinuarBuscar() {
    this.navCtrl.navigateForward(["agregar-amigo2", {}]);
  }
}
