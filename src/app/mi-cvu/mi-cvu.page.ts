import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mi-cvu',
  templateUrl: './mi-cvu.page.html',
  styleUrls: ['./mi-cvu.page.scss'],
})
export class MiCvuPage implements OnInit {

  constructor( private modalCtr: ModalController) { }

  ngOnInit() {
  }
  async Close() {
    await this.modalCtr.dismiss();
  }
}
