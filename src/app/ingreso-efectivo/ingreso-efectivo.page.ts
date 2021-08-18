import { CargarEfectivoService } from '../service/cargar-efectivo.service';
import { IBarcode } from '../interfaces/Ibarcode';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-ingreso-efectivo',
  templateUrl: './ingreso-efectivo.page.html',
  styleUrls: ['./ingreso-efectivo.page.scss'],
})
export class IngresoEfectivoPage implements OnInit {

  constructor(public navCtrl: NavController, public cargaEfectivo: CargarEfectivoService, public route: ActivatedRoute, private clipboard: Clipboard) { }
  public barcode;
  public pmc19;
  public mostrar_pmc = true
  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(p.monto);
    this.cargaEfectivo.obtener_barcode(p.monto).then((data: IBarcode) => {
      console.log(data);
      this.barcode = data.barcode1;
      this.pmc19 = data.pmc;
      if (this.pmc19 == "")
        this.mostrar_pmc = false;
    }).catch(err=>{
      console.log(err);
    })
  }
  copy(data) {
    this.clipboard.copy(data);

  }
  Home() {
    this.navCtrl.navigateForward(["home", {}]);
  }
  Atras() {
    this.navCtrl.navigateBack(["ingreso-efectivo-monto", {}]);
  }
}
