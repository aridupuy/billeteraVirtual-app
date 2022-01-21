import { Usuario } from '../../../models/usuario';
import { UssersService } from '../../../service/ussers.service';
import { UsuarioPermiso } from '../../../models/usuario-permiso';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-permiso',
  templateUrl: './usuarios-permiso.page.html',
  styleUrls: ['./usuarios-permiso.page.scss'],
})
export class UsuariosPermisoPage implements OnInit {

  usuario:Usuario;
  permisos:[UsuarioPermiso];
  usuariopermisos:[UsuarioPermiso];
  options:any;
  constructor(public alertController:AlertController,public navCtrl:NavController,public UssersService: UssersService,public route:ActivatedRoute,public navParams: NavParams) { }

  ngOnInit() {
    let param = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.usuario=param.usuario;
    this.obtener_permisos();
  }
  async obtener_permisos(){
    await this.UssersService.obtener_permisos()
    .then((data:[UsuarioPermiso])=>{
      console.log(data);
      this.permisos=data;
      this.options = data.map(a => {return {...a}})
      this.options.fill(false,0)
      console.log(this.options);
      console.log(this.permisos);
    })
    .catch(err=>{
      console.log(err);
    });

    await this.UssersService.obtener_permisos_usuario(this.usuario)
    .then((data:[UsuarioPermiso])=>{
      this.usuariopermisos=data;
      this.permisos.filter((data,index)=>{
        this.usuariopermisos.find((element,i)=>{
          if(element.id==data.id){
              this.options[index]=true;
              console.log(this.options)
              return true;
            }
        });
        return false;
      });
      console.log(this.options);
    })
    .catch(err=>{
      console.log(err);
    });
  }
  select(){
    // this.options[i]=usuario.id;
    // console.log(this.options);
  }
  nuevo(){
    let permisos=[];
    this.options.map((data,index)=>{
      console.log(data);
      if(data){
        permisos.push(this.permisos[index]);
      }
    })
    console.log(permisos);
    this.UssersService.setear_permiso(this.permisos,this.usuario,this.options).then(async data=>{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "Permisos seteados correctamente.",
        message: "",
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
      console.log("Terminando");
      this.navCtrl.navigateRoot("usuarios");
      await alert.present();
    }).catch(async err=>{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "",
        message: err,
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
    });
  }
}
