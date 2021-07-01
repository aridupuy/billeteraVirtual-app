import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lostpassword-exito',
  templateUrl: './lostpassword-exito.page.html',
  styleUrls: ['./lostpassword-exito.page.scss'],
})
export class LostpasswordExitoPage implements OnInit {

  constructor(private navCtrl : NavController,private route:ActivatedRoute) {}
  public tel;
  public mail;
  ngOnInit() {
    let  p  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    if(p != null){
      if(p["mail"]!=null)
    this.mail = p.mail;
    if(p["tel"]!=null)
      this.tel = p.tel;
    }

  }
  Ingresar(){
    this.navCtrl.navigateForward(["ingreso",{}]);
  }
}
