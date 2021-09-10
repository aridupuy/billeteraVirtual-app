import { variable } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import * as domtoimage from 'dom-to-image';


@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.page.html',
  styleUrls: ['./comprobante.page.scss'],
})
export class ComprobantePage implements OnInit {
  @ViewChild('container_comp') container_comp;
  constructor(public route: ActivatedRoute, public Router: Router,public PDFGenerator:PDFGenerator) { }
  public item;
  public resumen;

  ngOnInit() {
    let p = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    this.item = p.item;
    console.log(this.item);
    
    this.resumen = JSON.parse(this.item.resumen);
    if(this.resumen.persona.nombre==null)
        this.resumen.persona.nombre = "Amigo";
    console.log(this.resumen);

    
    let url =this.Router.url;
    // console.log(this.Router);
    // this.PDFGenerator.fromURL("",options).then(data=>{
    //   console.log(data);
    // })
    // this.PDFGenerator.fromData(this.container.nativeElement.parentNode.innerHTML, options).then(base64String =>{ 
    //     console.log("aca");
    //     console.log(base64String)
    // }).catch(err=>{
    //   console.log("aca err");
    //   console.log(err);
    // })
  }
  compartir(){
    
    let options = {
      documentSize: 'A4',
      type: 'share'
    }
    domtoimage.toPng(this.container_comp.nativeElement,{
      height: this.container_comp.offsetHeight * 2,
      width: this.container_comp.offsetWidth * 2 
    }).then(data=>{
        console.log("<div style='margin-left:auto;margin-rigth:auto; width:100%'><img src='"+data+"' ></div>");
        this.PDFGenerator.fromData("<div style='display: flex;justify-content: center;align-content: center;align-self: center; margin-right: 6%;'><img style='width: 100%;' src='"+data+"' ></div>", options);
    });
    
    
  }
  fecha_espaniol(fecha) {

    switch (fecha) {
      case "1":
        return "Enero";
        break;
      case "2":
        return "Febrero";
        break;
      case "3":
        return "Marzo";
        break;
      case "4":
        return "Abril";
        break;
      case "5":
        return "Mayo";
        break;
      case "6":
        return "Junio";
        break;
      case "7":
        return "Julio";
        break;
      case "8":
        return "Agosto";
        break;
      case "9":
        return "Septiembre";
        break;
      case "10":
        return "Octubre";
        break;
      case "11":
        return "Noviembre";
        break;
      case "12":
        return "Diciembre";
        break;
    }
  }
  obtener_comisiones(){
      return parseFloat(this.item.fijo)+parseFloat(this.item.variable);
  }
  
}
