import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { menuController } from "@ionic/core";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  @Input("img") img;
  
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    
  }
  
  MenuLogout() {
    this.navCtrl.navigateForward("/logout");
    menuController.close()
  }
}
