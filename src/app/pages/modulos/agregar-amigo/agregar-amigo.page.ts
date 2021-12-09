
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { ContactoService } from '../../../service/contacto.service';
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
  public resultadosOld;
  public allContactsVista;
  public buscando = false;
  public sinResutados = false
  public amigos = [];
  public enviar;
  public pedido;
  constructor(public route: ActivatedRoute, private contact: Contacts, private contacts: Contacts, public contacto: ContactoService, private navCtrl: NavController) { }
  public allContacts = [];
  public loading_contacts = true;
  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    // this.p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log("entre");
    if (!p) {
      p = { envio: true };

    }
    if ('envio' in p) {
      this.enviar = p.envio;
    }

    if ('pedir' in p) {
      this.pedido = p.pedir;
    }
    this.loading_contacts = true;


  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log("busco Contactos");
    if (window.hasOwnProperty('cordova'))
      this.contact.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true })
        .then(data => {
          //console.log(data);
          
          /*ver como hacer mas optimo esto*/
          data.forEach((cont) => {
            // console.log(JSON.stringify(cont));
            if (cont.emails != null) {
              cont.emails.forEach((email) => {
                // console.log(JSON.stringify(email));
                this.contacto.buscar_contactos(email.value, this.tipo).then((usuario: any[]) => {
                  console.log("Encontrado");
                  // console.log(usuario);
                  usuario.forEach(usu => {
                    this.loading_contacts = false;
                    usu["marcado"] = 0;
                    usu["invitar"] = false;
                    this.allContacts.push(usu);
                  })
                  // 
                  // console.log(JSON.stringify(usuario[0]));
                  // 
                  
                }).catch(err => {
                  console.log("no encontrado");
                  console.log(cont.name);
                  let usu = {
                    marcado: false,
                    nombre: cont.name.formatted != "" ? cont.name.formatted : cont.name.givenName != "" ? cont.name.givenName : cont.name.familyName,
                    appelido: "test",
                    id: cont.name.formatted != "" ? cont.name.formatted : cont.name.givenName != "" ? cont.name.givenName : cont.name.familyName + "_" + cont.phoneNumbers[0].value == null ? cont.phoneNumbers[0] : cont.phoneNumbers[0].value,
                    invitar: true
                  };
                  console.log(usu);
                  //console.log(cont);
                  this.allContacts.push(usu);
                  this.loading_contacts = false;
                });
              })
            }
            else {
              let usu = {
                marcado: false,
                nombre: cont.name.formatted != "" ? cont.name.formatted : cont.name.givenName,
                tel: cont.phoneNumbers[0].value,
                id: cont.name.formatted != "" ? cont.name.formatted : cont.name.givenName + "_" + cont.phoneNumbers[0].value == null ? cont.phoneNumbers[0] : cont.phoneNumbers[0].value,
                invitar: true
              };
              //console.log(usu);
              this.loading_contacts = false;
              this.allContacts.push(usu);
            }
            //console.log(JSON.stringify(this.allContacts));
          })
          // console.log(JSON.stringify(this.allContacts));
          // aca estaria bueno sacar los duplicados.
          // = data
          // let ContactsNoDuplicate=[];

          // this.allContacts.forEach((item)=>{
          //   let encontrado=false;
          //   ContactsNoDuplicate.forEach((item2)=>{
          //     console.log(item.nombre.toUpperCase());
          //     console.log(item2.nombre.toUpperCase());
          //     console.log(item.nombre.toUpperCase()==item2.nombre.toUpperCase());
          //       if(item.nombre.toUpperCase()==item2.nombre.toUpperCase()){
          //           encontrado=true;
          //       }
          //   })
          //   if(!encontrado){
          //     ContactsNoDuplicate.push(item);
          //   }
          // });
          // this.allContacts=ContactsNoDuplicate;

        })
    else {
      this.loading_contacts = false;
    }
    // this.contacto.obtener_ultimos_contactos().then((data: any[]) => {
    //   console.log(data);
    //   data.forEach(d => {
    //     d["iniciales"] = this.iniciales(d.nombre);
    //   });
    //   this.ultimos = data;
    // }).catch(err => {
    //   console.log(err);
    // });
    this.allContactsVista = this.allContacts;
  }
  agregarAmigo() {
    return this.pedir();
  }
  tipo = "nombre";
  metodo_busqueda(tipo) {
    this.busqueda = "";
    switch (tipo) {
      case "nombre":
        document.getElementById("metodo_nombre").classList.remove("inactivo");
        document.getElementById("metodo_nombre").classList.add("activo");
        document.getElementById("metodo_mail").classList.remove("activo");
        document.getElementById("metodo_mail").classList.add("inactivo");
        document.getElementById("metodo_cel").classList.remove("activo");
        document.getElementById("metodo_cel").classList.add("inactivo");
        this.resultados = [];
        this.allContactsVista = this.allContacts;
        this.tipo = "nombre";
        break;
      case "mail":
        document.getElementById("metodo_mail").classList.remove("inactivo");
        document.getElementById("metodo_mail").classList.add("activo");
        document.getElementById("metodo_cel").classList.remove("activo");
        document.getElementById("metodo_cel").classList.add("inactivo");
        document.getElementById("metodo_nombre").classList.remove("activo");
        document.getElementById("metodo_nombre").classList.add("inactivo");
        this.resultados = [];
        this.tipo = "mail";
        this.allContactsVista = [];
        break;
      case "celular":
        this.resultados = [];
        this.allContactsVista = [];
        document.getElementById("metodo_cel").classList.remove("inactivo");
        document.getElementById("metodo_cel").classList.add("activo");
        document.getElementById("metodo_mail").classList.remove("activo");
        document.getElementById("metodo_mail").classList.add("inactivo");
        document.getElementById("metodo_nombre").classList.remove("activo");
        document.getElementById("metodo_nombre").classList.add("inactivo");
        this.tipo = "celular";
        break;
    }
  }

  async buscar(event) {
    console.log(this.busqueda);
    this.buscando = true;
    this.sinResutados = false
    this.resultados = [];
    this.resultadosOld = this.allContacts;
    if (this.busqueda == "")
      this.allContactsVista = this.resultadosOld;
    else {
      this.allContactsVista = [];
    }
    if (this.tipo == "nombre") {
       this.resultados = await this.resultadosOld.filter(data => {
        return (data.nombre.toUpperCase().search(this.busqueda.toUpperCase())) != -1 //-1 es lo que retorna search si no encuentra nada;
      })
      this.buscando = false;
      return this.resultados;
    }
    else
      this.contacto.buscar_contactos(this.busqueda, this.tipo).then(data => {
        this.resultados = data;
        this.buscando = false;
        console.log(data);
      }).catch(err => {
        this.buscando = false;
        this.sinResutados = true
      });
  }
  busquedaAutomatica(event) {
    if (this.tipo == "nombre") {
      console.log(this.busqueda);
      this.buscar(event);
    }
    return false;
  }
  iniciales(nombre) {
    if (nombre == null)
      return "";
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
        param: JSON.stringify({ var: this.amigos, pedir: this.pedido, envio: this.enviar })
      }
    };
    console.log(navigationExtras);
    // this.modalCtrl.dismiss();
    this.navCtrl.navigateForward("agregar-amigo2", navigationExtras);

  }
  marcar(resultado) {
    if (resultado.marcardo == false) {
      return false;
    }
    if (resultado.marcado == undefined || resultado.marcado == 0) {
      resultado["marcado"] = 1;
      resultado["iniciales"] = this.iniciales(resultado.nombre);
      this.amigos.push(resultado);
    } else {
      resultado["marcado"] = 0;
      let index = this.amigos.findIndex(res => resultado.id == res.id);
      this.amigos.splice(index, 1);
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
  invitar(item) {
    //aca deveria mandarle un sms al usuario con la url para descargar la app.
    item.invitado = true;
  }
  ContinuarBuscar() {
    this.navCtrl.navigateForward(["agregar-amigo2", {}]);
  }
}
