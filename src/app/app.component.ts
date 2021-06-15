import { UsuarioService } from './service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public usuario;
  public iniciales;
  constructor(public usuarioService:UsuarioService,private navCtrl : NavController) {}
  ngOnInit(){
    let nombre =  localStorage.getItem("nombre");
    if(nombre && this.iniciales){
      this.usuario = nombre;
      
      return false;
    }
    this.usuarioService.obtener_mis_datos().then((data:any)=>{
        this.usuario = data.nombre;
        this.iniciales = data.nombre_completo
        .split(' ')
        .map( it => it.charAt(0) )
        .slice(0,1)
        .join('')
        +data.nombre_completo
        .split(' ')
        .map( it => it.charAt(0) )
        .slice(2,3)
        .join('');
        console.log("aca");
        localStorage.setItem("nombre",this.usuario);
        localStorage.setItem("iniciales",this.iniciales);
        console.log(this.usuario);
    });
    
  }
  IrAtras() {
    this.navCtrl.back();
  }
}
@Component({
  selector: 'welcome',
  template: `
    <ion-content>
      <ion-slides pager="true" [options]="slideOpts">
        <ion-slide>
          <h1>Slide 1</h1>
        </ion-slide>
        <ion-slide>
          <h1>Slide 2</h1>
        </ion-slide>
        <ion-slide>
          <h1>Slide 3</h1>
        </ion-slide>
      </ion-slides>
    </ion-content>
  `
})
export class SlideExample {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private screenOrientation: ScreenOrientation) {
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  
}