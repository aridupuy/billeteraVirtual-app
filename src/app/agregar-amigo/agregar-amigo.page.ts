
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { ContactoService } from '../service/contacto.service';
import { PedirAmigoDesdelistaPage } from '../pedir-amigo-desdelista/pedir-amigo-desdelista.page';
import { ActivatedRoute } from '@angular/router';
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
  public ultimos = [];
  public busqueda;
  public resultados;
  public buscando = false;
  public sinResutados = false
  public amigos = [];
  public enviar;
  public pedido;
  constructor(public route:ActivatedRoute,private contact: Contacts, private contacts: Contacts, public contacto: ContactoService, private navCtrl: NavController) { }
  public allContacts = [];
  public loading_contacts=true;
  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    // this.p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));

    if(!p){
      p={envio:true};
      
    }
    if('envio' in p ){
      this.enviar = p.envio;
    }
    
    if('pedir' in p ){
      this.pedido = p.pedir;
    }
   };
  ionViewDidEnter() {
    this.loading_contacts = true;
    if (window.hasOwnProperty('cordova'))
      this.contact.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true })
        .then(data => {
          /*ver como hacer mas optimo esto*/
          data.forEach((cont) => {
            // console.log(JSON.stringify(cont));
            if (cont.emails != null)
              cont.emails.forEach((email) => {
                // console.log(JSON.stringify(email));
                this.contacto.buscar_contactos(email.value,this.tipo).then((usuario: any[]) => {
                  console.log(usuario);
                  usuario.forEach(usu => {
                    usu["marcado"] = 0;
                    usu["invitar"]=0;
                    this.allContacts.push(usu);
                  })
                  // 
                  // console.log(JSON.stringify(usuario[0]));
                  // 
                  this.loading_contacts = false;
                }).catch(err=>{
                  let usu=[];
                  usu["marcado"] = 0;
                  usu["nombre"]=cont.displayName;
                  usu["id"]=cont.name+"_"+cont.phoneNumbers[0];
                  usu["invitar"]=1;
                  this.allContacts.push(usu);
                });
              })
            console.log(JSON.stringify(this.allContacts));
          })
          // console.log(JSON.stringify(this.allContacts));
          // = data
          console.log(JSON.stringify(this.allContacts));
        });
        else {
          this.loading_contacts = false;
        }
    this.contacto.obtener_ultimos_contactos().then((data: any[]) => {
      console.log(data);
      data.forEach(d => {
        d["iniciales"] = this.iniciales(d.nombre);
      });
      this.ultimos = data;
    }).catch(err => {
      console.log(err);
    });


  }
  agregarAmigo() {
    return this.pedir();
  }
  tipo = "mail";
  metodo_busqueda(tipo) {
    switch (tipo) {
      case "mail":
        document.getElementById("metodo_mail").classList.remove("inactivo");
        document.getElementById("metodo_mail").classList.add("activo");
        document.getElementById("metodo_cel").classList.remove("activo");
        document.getElementById("metodo_cel").classList.add("inactivo");
        this.resultados = [];
        this.tipo = "mail";
        break;
      case "celular":
        this.resultados = [];
        document.getElementById("metodo_cel").classList.remove("inactivo");
        document.getElementById("metodo_cel").classList.add("activo");
        document.getElementById("metodo_mail").classList.remove("activo");
        document.getElementById("metodo_mail").classList.add("inactivo");
        this.tipo = "celular";
        break;
    }
  }

  buscar(event) {
    console.log(this.busqueda);
    this.buscando = true;
    this.sinResutados = false
    this.resultados=[];
    this.contacto.buscar_contactos(this.busqueda,this.tipo).then(data => {
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
        param: JSON.stringify({ var: this.amigos,pedir:this.pedido,envio:this.enviar })
      }
    };
    console.log(navigationExtras);
    // this.modalCtrl.dismiss();
    this.navCtrl.navigateForward("agregar-amigo2", navigationExtras);

  }
  marcar(resultado) {
    console.log(resultado);
    if(resultado.marcado==undefined || resultado.marcado==0){
      resultado["marcado"] = 1;
      resultado["iniciales"] = this.iniciales(resultado.nombre);
      this.amigos.push(resultado);
    }else{
      resultado["marcado"] = 0;
      let index = this.amigos.findIndex(res=>resultado.id==res.id);
      this.amigos.splice(index,1);
    }
    console.log(this.amigos);
  }
  // desmarcar(resultado) {
  //   console.log(resultado);
  //   this.amigos.reduce((item) => {
  //     console.log(item);
  //     if (item.id == resultado.id)
  //       return false;
  //   })
  // }
  ContinuarBuscar() {
    this.navCtrl.navigateForward(["agregar-amigo2", {}]);
  }
}
