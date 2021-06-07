import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preguntas-popup',
  templateUrl: './preguntas-popup.page.html',
  styleUrls: ['./preguntas-popup.page.scss'],
})
export class PreguntasPopupPage implements OnInit {

  constructor( private modalCtr: ModalController) { }

  ngOnInit() {
  }
  async Close() {
    const closeModal: string = "Acepto los términos y condiciones.";
    await this.modalCtr.dismiss(closeModal);
  }
}
