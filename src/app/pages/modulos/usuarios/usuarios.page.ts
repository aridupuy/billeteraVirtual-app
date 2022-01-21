import { UssersService } from '../../../service/ussers.service';
import { Usuario } from '../../../models/usuario';
import { NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios;
  refrescar
  offset;
  Usersback;
  limit=10;
  class_refresher="";
  public ussers: { nombre: any; username: any; fecha: any; tipo: any; id_tipo_trans: any; id_cuenta: any; fijo: any; variable: any; monto_final: number; id_entidad: any; id_referencia: any; resumen: any; click(): void; }[];


  constructor(private menu: MenuController, public UssersService: UssersService,public alertController:AlertController,public navCtrl:NavController,public navParams:NavParams) { }

  ngOnInit() {
    this.cargar_usuarios();
  }
  mostrar(event: any) {
    // this.class_refresher = "refresher"

  }
  refresh(event: any) {
    this.offset = 0;
    this.ussers = undefined;
    this.Usersback = undefined;
    this.refrescar = true;
    this.cargar_usuarios(event);
    
  }
  cargar_usuarios(event?: { target: { complete: () => void; }; }){
    console.log("cargando usuarios");
    this.UssersService.obtener_usuarios().then((data:[Usuario])=>{
      
      this.refrescar = false;
      data.map(usuario=>{
        if(usuario.activo==4 || usuario.activo==null){
          usuario.activo=false;
        }
        else{
          usuario.activo=true;
        }
        return usuario;
      })
      this.usuarios=data;
      this.Usersback = this.usuarios;
      if (event) {
        event.target.complete();
        this.class_refresher = "";
      }
    }).then(err=>{
      console.log(err);
      this.usuarios = this.Usersback;
      this.refrescar = false;
      this.class_refresher = ""
    })
    
  }
  cargar_usuarios_filtrado(){


  }
  cargarmas(event: any) {
    this.offset += this.limit;
    this.cargar_usuarios(event);

  }

  cambiar_estado(usuario:Usuario){

    this.UssersService.cambiar_usuario(usuario).then(async (data:Usuario)=>{
      usuario.activo= (data.id==1);
      let mensaje = usuario.activo?"Activó":"Desactivó";
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "",
        message: "Se "+mensaje+" con exito.",
        buttons: [
          {
            text: ''
          },
          {
            text: 'Entendido',
            role: 'cancel',
            cssClass: 'primary'
          }
        ]
        
      });
  
      await alert.present();
    })

  }


  nuevo(){
    this.navCtrl.navigateForward("nuevo-usuario");
  }

  ver_permisos(usuario:Usuario){
    // this.usuario=new Usuario();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({usuario:usuario})
      }
    };
  // let params =this.navParams.data={usuario:usuario};
  this.navCtrl.navigateForward("usuarios-permiso",navigationExtras);
  }
}
