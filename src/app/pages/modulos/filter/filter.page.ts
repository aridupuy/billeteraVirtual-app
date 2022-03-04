import {Component, Input} from '@angular/core';
//import { ModalController, NavParams } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
//import {ViewController} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import * as moment from 'moment';


@Component({
    selector: 'filter-page',
    templateUrl: 'filter.page.html',
})
export class FilterPage {

    // "value" passed in componentProps
    @Input() value: number;
    select: any;
    form: FormGroup;
    select2: any;
    constructor(public viewCtrl: ModalController, public fb: FormBuilder,public params: NavParams) {
          // this.select= params.get("select");
          this.select="1";
          if(params.get("tipo")){
            this.select = params.get("tipo");
          }
          this.form = fb.group({
            select: this.select,
            select2: this.select2,
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
        select2: ["1"],
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

    selectFecha(){
        let fecha =moment(Date.now());
        console.log(this.form.value.select2);
        switch(this.form.value.select2){
            case 1:
            case "1":
                /*DD/MM/YYYY*/
                /* "year" | "years" | "y" |
                    "month" | "months" | "M" |
                    "week" | "weeks" | "w" |
                    "day" | "days" | "d" |
                    "hour" | "hours" | "h" |
                    "minute" | "minutes" | "m" |
                    "second" | "seconds" | "s" |
                    "millisecond" | "milliseconds" | "ms" */
//                    2022-01-23T13:58:54.891-03:00

                /*ayer */
                this.form.value.hasta=fecha.format("YYYY-MM-DDTHH:mm:ss.ms-03:00");
                this.form.value.desde=fecha.subtract(1,"d").format("YYYY-MM-DDTHH:mm:ss.ms-03:00");
                break;
            case 2:
            case "2":
                /*Semana*/
                this.form.value.hasta=fecha.format("YYYY-MM-DDTHH:mm:ss.ms-03:00");
                this.form.value.desde=fecha.subtract(1,"w").format("YYYY-MM-DDTHH:mm:ss.ms-03:00");
                // this.form.value.=;
                break;
            case 3:
            case "3":
                /*Mes*/
                this.form.value.hasta=fecha.format("YYYY-MM-DDTHH:mm:ss.ms-03:00");
                this.form.value.desde=fecha.subtract(1,"M").format("YYYY-MM-DDTHH:mm:ss.ms-03:00");
                break;
        }
    }

}
