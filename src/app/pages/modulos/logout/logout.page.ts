import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }
  logout(){
    localStorage.clear();
    Cookie.deleteAll();
    this.navctrl.navigateRoot("home");
  }
}
