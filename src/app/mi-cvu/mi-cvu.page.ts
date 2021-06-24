import { ObtenerDatosService } from '../service/obtener-datos.service';
import { Icvu } from '../interfaces/Icvu';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-mi-cvu',
  templateUrl: './mi-cvu.page.html',
  styleUrls: ['./mi-cvu.page.scss'],
})
export class MiCvuPage implements OnInit {

  constructor( private modalCtr: ModalController,public datos:ObtenerDatosService,private clipboard: Clipboard) { }
  public cvu;
  public alias
  ngOnInit() {
    this.datos.obtener_datos().then((data:Icvu)=>{
      this.cvu = data.cvu;
      this.alias = data.alias;
    }).catch(err=>{
      console.log(err);
    })
  }
  copy(data){
    this.clipboard.copy(data);
  }

  async Close() {
    await this.modalCtr.dismiss();
  }
}
