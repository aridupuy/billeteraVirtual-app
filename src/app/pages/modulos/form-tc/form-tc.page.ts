
import { Event } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from '../../../classes/observable';
import { TarjetasService } from '../../../service/tarjetas.service';
import { LoadScriptService } from '../../../service/load-script.service';
import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { factoryDecidir } from '../../../classes/FactoryDecidir';
import { validadorTc } from '../../../classes/validadorTc';
/**
 * Generated class for the FormTcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let Decidir: any
interface Idecidir {
  id: any,

}
@Component({
  selector: 'page-form-tc',
  templateUrl: 'form-tc.page.html',
  styleUrls: ['form-tc.page.scss']
})

export class FormTcPage {
  @ViewChild('formularioTarjeta') formulario: ElementRef;
  @ViewChild('tarjeta') tarjeta: ElementRef;
  @ViewChild('btnAbrirFormulario') btnAbrirFormulario: ElementRef;
  @ViewChild('tarjetaNumero') tarjetaNumero: ElementRef;
  @ViewChild('inputDoc') documento: ElementRef;
  @ViewChild('tarjetaNombre') tarjetaNombre: ElementRef;
  @ViewChild('logoMarca') logoMarca: ElementRef;
  @ViewChild('tarjetaExpiracionMes') ExpiracionMes: ElementRef;
  @ViewChild('tarjetaExpiracionAnio') ExpiracionAño: ElementRef;
  @ViewChild('firma') firma: ElementRef;
  @ViewChild('CVV') CVV: ElementRef;
  @ViewChild('inputCVV') inputCVV: ElementRef;
  @ViewChild('selectMes') selectMes: ElementRef;
  @ViewChild('selectAnio') selectAño: ElementRef;
  public cvv;
  public nombre;
  public numero;
  public mes;
  public anio;
  public decidir;
  public selectedForm;
  public token: string;
  public responseDecidir;
  constructor(public modalCtrl: ModalController, public tar: TarjetasService, public scriptService: LoadScriptService) {

    console.log("aca");
  }

  mostrarFrente() {
    if (this.tarjeta.nativeElement.classList.contains('active')) {
      this.tarjeta.nativeElement.classList.remove('active');
    }
  }


  ngAfterViewInit() {
    this.changeRequestType("formulario-tarjeta");


    for (let i = 1; i <= 12; i++) {
      let opcion = document.createElement('ion-select-option');
      if (i < 10) {
        opcion.value = "0" + i.toString();
        opcion.innerText = "0" + i.toString();
      }
      else {
        opcion.value = i.toString();
        opcion.innerText = i.toString();
      }
      this.selectMes.nativeElement.appendChild(opcion);

    }

    // * Select del año generado dinamicamente.
    var yearActual = new Date().getFullYear();
    for (let i = yearActual; i <= yearActual + 8; i++) {
      let opcion = document.createElement('ion-select-option');
      opcion.value = i.toString().substr(2, 2);
      opcion.innerText = i.toString();
      this.selectAño.nativeElement.appendChild(opcion);
    }
    this.abrirFormularioClick();
  }
  nombreKeyUp(e) {
    let valorInput = e.target.value;
    this.tarjetaNombre.nativeElement.value = valorInput.replace(/[0-9]/g, '');
    this.tarjetaNombre.nativeElement.textContent = valorInput;
    this.firma.nativeElement.textContent = valorInput;

    if (valorInput == '') {
      this.tarjetaNombre.nativeElement.textContent = 'Jhon Doe';
    }
    this.nombre = valorInput;
    this.mostrarFrente();
  }

  mesChange(e) {
    this.ExpiracionMes.nativeElement.textContent = e.target.value;
    this.mes = e.target.value;
    this.mostrarFrente();
  }
  yearChange(e) {
    this.ExpiracionAño.nativeElement.textContent = e.target.value;
    this.anio = e.target.value;
    this.mostrarFrente();
  }
  cvvKeyUp(e) {
    if (!this.tarjeta.nativeElement.classList.contains('active')) {
      this.tarjeta.nativeElement.classList.toggle('active');
    }

    this.inputCVV.nativeElement.value = this.inputCVV.nativeElement.value
      // Eliminar los espacios
      .replace(/\s/g, '')
      // Eliminar las letras
      .replace(/\D/g, '');

    this.CVV.nativeElement.textContent = this.inputCVV.nativeElement.value;
    this.cvv = this.inputCVV.nativeElement.value;
  }

  tarjetaClick() {
    this.tarjeta.nativeElement.classList.toggle('active');
  }
  abrirFormularioClick() {
    this.btnAbrirFormulario.nativeElement.classList.toggle('active');
    this.formulario.nativeElement.classList.toggle('active');
  }
  inputNumeroKeyUp(e) {
    //console.log(e);
    let valorInput = e.target.value;

    this.tarjetaNumero.nativeElement.value = valorInput
      // Eliminamos espacios en blanco
      .replace(/\s/g, '')
      // Eliminar las letras
      .replace(/\D/g, '')
      // Ponemos espacio cada cuatro numeros
      .replace(/([0-9]{4})/g, '$1 ')
      // Elimina el ultimo espaciado
      .trim();

    this.tarjetaNumero.nativeElement.textContent = valorInput;
    this.numero = valorInput;
    if (valorInput == '') {
      this.tarjetaNumero.nativeElement.textContent = '#### #### #### ####';

      this.logoMarca.nativeElement.innerHTML = '';
    }
    this.logoMarca.nativeElement.innerHTML = '';
    const imagen = document.createElement('img');
    console.log(valorInput);
    let validador = new validadorTc();
    // if(!validador.validar(valorInput)){
    //     this.numero="";
    //     return false;
    // }
    console.log(validador.ValidarTarjeta(valorInput));
      switch(validador.ValidarTarjeta(valorInput)){
        case "amex":
          imagen.src = '../../assets/img/ingreso/tarjetas/american.svg';
          break;
        case "visa":
          imagen.src = '../../assets/img/ingreso/tarjetas/visa.svg';
          break;
        case "mastercard":
          imagen.src = '../../assets/img/ingreso/tarjetas/mastercard.svg';
          break;
      }
      this.logoMarca.nativeElement.appendChild(imagen);
    
    // if (valorInput[0] == 4) {
    //  
    //   
    //   this.logoMarca.nativeElement.appendChild(imagen);
    // } else if (valorInput[0] == 5) {
    //   this.logoMarca.nativeElement.innerHTML = '';
    //   const imagen = document.createElement('img');
    //   imagen.src = '../../assets/img/ingreso/tarjetas/mastercard.svg';
    //   this.logoMarca.nativeElement.appendChild(imagen);
    // }

    // Volteamos la tarjeta para que el usuario vea el frente.
    this.mostrarFrente();
  }

  inputDocKeyUp(e) {
    let valorInput = e.target.value;
    this.documento = valorInput;
  }
  async enviar(event) {
    console.log(this.anio);
    console.log(this.mes);
    console.log(this.documento);
    //await this.sendForm(event).then(async (response:Idecidir)=>{
    //console.log(response);
    await this.tar.cargar(this.numero, this.cvv, this.mes, this.anio, this.nombre,
      this.documento)
      .then(data => {
        console.log(data);
      }).catch(err => {
        console.log(err);
      });
    //});
    //    Observable.notify("return",true);
  }
  CerrarModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    Observable.notify("return", true);
  }


  changeRequestType(value) {
    this.selectedForm = value
    let containers = document.querySelectorAll('form')
    for (var i = 0; containers.length > i; i++) {
      let e = containers[i];

      e.setAttribute('hidden', 'true');
    }
    console.log("value");
    let form = document.querySelector('#' + value);
    console.log(form);
    form.removeAttribute('hidden');

  }
  async sendForm(event) {
    return new Promise(async (resolve, reject) => {
      event.preventDefault();
      var $form = document.querySelector('#formulario-tarjeta');
      let environment = 1;
      let useCybersource = false;
      var factory = new factoryDecidir(); //Agro usa configuracion local por defecto.
      this.decidir = factory.create(useCybersource);
      console.log('Decidir.createToken()');
      await this.decidir.createToken($form, async (status, response) => {
        console.log(response);
        resolve(response);
      });
      //    document.querySelector('#agro_set').removeAttribute('hidden');
      //return event;
    })
  }
  guessingPaymentMethod() {

    var bin = this.decidir.getBin(this.numero);
    var issuedInput = document.querySelector('#issued');
    var nombre_tarj = document.querySelector('#nombre_tarj');

    var bin_view = document.querySelector('#bin');
    issuedInput.nodeValue = this.decidir.cardType(this.numero);
    //  alert(issuedInput.value);
    //    document.querySelector('input[class][name="num_tarjeta"]').class='num-tarjeta '+ issuedInput.value

    console.log('bin', bin);
  }

  parse_error($string) {
    switch ($string) {
      case "expiry_date":
        return "Fecha de expiracion invalida";
      case "curl error: Operation timed out after 30000 milliseconds with 0 bytes received":
        return "La operacion ha fallado, Reintente";
      case "curl error: Operation timed out after 30001 milliseconds with 0 bytes received":
        return "La operacion ha fallado, Reintente";
    }
    return $string;
  }




}
