import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.page.html',
  styleUrls: ['./terminos-condiciones.page.scss'],
})
export class TerminosCondicionesPage implements OnInit {

  constructor( private modalCtr: ModalController) { }

  ngOnInit() {
  }
  async Close() {
    const closeModal: string = "Acepto los términos y condiciones.";
    await this.modalCtr.dismiss(closeModal);
  }
}
