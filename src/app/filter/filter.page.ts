import {Component, Input} from '@angular/core';
//import { ModalController, NavParams } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
//import {ViewController} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';


@Component({
    selector: 'filter-page',
    templateUrl: 'filter.page.html',
})
export class FilterPage {

    // "value" passed in componentProps
    @Input() value: number;
    select: any;
    form: FormGroup;
    constructor(public viewCtrl: ModalController, public fb: FormBuilder,public params: NavParams) {
          // this.select= params.get("select");
          this.select="1";
          if(params.get("tipo")){
            this.select = params.get("tipo");
          }
          this.form = fb.group({
            select: this.select,
            desde: params.get("desde"),
            hasta: params.get("hasta")
        });
        // componentProps can also be accessed at construction time using NavParams
    }
    ionViewWillEnter() {
        //      this.select = this.navParams.get('aParameter');
        //      this.myOtherParameter = this.navParams.get('otherParameter');
    }
    public closeModal() {
        this.viewCtrl.dismiss(null);

    }
    vaciar(){
      this.form = this.fb.group({
        select: ["1"],
        desde: [""],
        hasta: [""]
    });
    }
    ApliModal() {
        console.log(this.form.value.desde);
        console.log(this.form.value.hasta);
        this.viewCtrl.dismiss({select: this.select, desde: this.form.value.desde,hasta:this.form.value.hasta});
    }
    changeFiltro() {
        //            if((select in this.form.value))
        this.select = this.form.value.select;
        console.log(this.select);
        //            recargar el array de la lista de transacciones    
    }
    cerrar(){

    }
}
