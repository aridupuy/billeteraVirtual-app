import { RegistroService } from '../service/registro.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrofinalizado',
  templateUrl: './registrofinalizado.page.html',
  styleUrls: ['./registrofinalizado.page.scss'],
})
export class RegistrofinalizadoPage implements OnInit {

  constructor(private navCtrl : NavController,public route: ActivatedRoute, public Router: Router) {}
  
  readonly = "true";
  public mensaje_titulo = "¡Todo un éxito!";
  public mensaje = "Ahora podés iniciar sesión y comenzar a disfrutar de todos los beneficios de llevar tu billetera en el celular."
  public mensaje2 = "Ya completaste tu registro";
  public valido = false;
  ngOnInit() {
      let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
      console.log(p);
      this.valido=p.valido;
      console.log(this.valido);
      if(!p.valido){
        this.mensaje  = p.mensaje;
        this.mensaje_titulo =p.mensaje_titulo
        if(this.mensaje!=null){
          this.mensaje2="";
        }
      }
  }
  Ingresar(){
    localStorage.setItem("onboarding","0");
    this.navCtrl.navigateForward("ingreso");
  }
  reintentar(){
    this.navCtrl.navigateBack("datospersonales2");
  }
  
}
