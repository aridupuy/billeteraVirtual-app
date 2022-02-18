import { Usuario } from '../../../models/usuario';
import { UssersService } from '../../../service/ussers.service';
import { UsuarioPermiso } from '../../../models/usuario-permiso';
import { PermisoService } from '../../../service/permiso.service';
import { id } from '../../../../../platforms/android/platform_www/cordova-js-src/platform';
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

  usuario: Usuario;
  permisos: [UsuarioPermiso];
  usuariopermisos: [UsuarioPermiso];
  options: any = [];
  submodulos: any = [];
  option_submodulos: any = [];
  constructor(public alertController: AlertController, public navCtrl: NavController, public UssersService: UssersService, public PermisoService: PermisoService, public route: ActivatedRoute, public navParams: NavParams) {
    let param = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.usuario = param.usuario;
    this.obtener_permisos();
    console.log(this.options);
  }

  ngOnInit() {

  }

  async obtener_submodulos(id) {
    console.log("obteniendo submodulos " + id);
    await this.UssersService.obtener_submodulos(id).then((data: Array<any>) => {
      this.submodulos[id] = data;
    }).catch(data => {

    });
    console.log(this.submodulos);
    return this.submodulos;
  }

  async obtener_permisos() {
    await this.PermisoService.obtener_rutas_alt()
      // await this.UssersService.obtener_permisos()
      .then(async (data: [UsuarioPermiso]) => {
        // console.log(data);
        this.permisos = data;
         data.forEach(element => {
          if (this.options[element.id_elemento_menu] == undefined) {
            this.options[element.id_elemento_menu] = false;
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.permisos.forEach(permiso => {
      if ("submodulos" in permiso)
        permiso.submodulos.forEach((submodulo, i) => {
          // this.option_submodulos.push(permiso.id_elemento_menu);
          if (this.option_submodulos[permiso.id_elemento_menu] == undefined) {
            this.option_submodulos[permiso.id_elemento_menu] = [];
          }
          this.option_submodulos[permiso.id_elemento_menu][submodulo.id_elemento_menu] = false;
        });
    });

    await this.UssersService.obtener_permisos_usuario(this.usuario)
      .then(async (data: [UsuarioPermiso]) => {
        // console.log(data);
        this.usuariopermisos = data;
        await this.permisos.filter(async (data) => {
        await this.usuariopermisos.forEach(async (element) => {
            this.options[data.id_elemento_menu] = false;
          });
        });


        await this.permisos.filter(async (data) => {
          await this.usuariopermisos.forEach(async (element) => {
            // console.log(element);
            
            if (element.id == data.id_elemento_menu) {
              this.options[data.id_elemento_menu] = true;
              return true;
            }
            else if ("submodulos" in data) {
              await data.submodulos.forEach((submodulo, indice) => {
                let index = data.id_elemento_menu;
                let i = submodulo.id_elemento_menu
                if (submodulo.id_elemento_menu == element.id) {
                  if (!(index in this.submodulos)) {
                    this.submodulos[index]=[];
                    if (!(index in this.submodulos) && !(i in this.submodulos[index])) {
                      this.submodulos[index][i] = submodulo;
                    }
                  }
                  this.submodulos[index][i] = submodulo;
                  return true;
                  
                }
                else {
                  if (this.submodulos[index] == undefined)
                    this.submodulos[index] = [];
                  if (this.submodulos[index][i] == undefined)
                    this.submodulos[index][i] = false;
                  return true;
                }
              })
            }
            return false;
          });
          return false;
        });
        this.option_submodulos = this.submodulos;
        console.log(this.option_submodulos);
      })
      .catch(err => {
        console.log("aca");


      });
    console.log(this.option_submodulos);
  }

  select(indice) {
    // this.options.forEach((element, index) => {
    if (this.options[indice] == true) {
      if (this.option_submodulos[indice] != undefined)
        this.option_submodulos[indice].forEach((submodulo, i) => {
          this.option_submodulos[indice][i] = true;
        });
    }
    else {
      if (this.option_submodulos[indice] != undefined)
        this.option_submodulos[indice].forEach((submodulo, i) => {
          this.option_submodulos[indice][i] = false;
        });
    }
    // });

  }
  select_submodulo(indice) {
    let todos_falsos = true;
    this.option_submodulos[indice].forEach((element) => {
      if (element == true) {
        if (this.options[indice] != undefined)
          this.options[indice] = true;

      }
      else {
        this.option_submodulos[indice].forEach((submodulo) => {
          if (submodulo == true)
            todos_falsos = false;
        });
        if (todos_falsos) {
          if (this.options[indice] != undefined)
            this.options[indice] = false;
        }
      }
    });
  }
  nuevo() {
    // let todos_falsos = true;
    let permisos = [];
    // console.log(this.permisos);
    this.options.map((data, index) => {
      // console.log(data);
      if (data) {
        permisos.push(this.permisos.filter(permiso => {
          return permiso.id_elemento_menu == index;
        })[0]);
      }
    })
    this.option_submodulos.map((data, index) => {
      data.map((d, i) => {
        if (d) {
          this.permisos.forEach((permiso) => {
            if (permiso.submodulos != undefined)
              return permiso.submodulos.filter((submodulo) => {
                this.options[i] = false;
                if (i == submodulo.id_elemento_menu) {
                  console.log(submodulo);
                  permisos.push(submodulo);
                  this.options[i] = true;
                }

              })
          });
        }
      })

    });
    this.UssersService.setear_permiso(permisos, this.usuario, this.options,this.option_submodulos).then(async data => {
      console.log(this.options);
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
    }).catch(async err => {
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
