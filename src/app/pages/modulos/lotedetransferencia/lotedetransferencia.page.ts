import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lotedetransferencia',
  templateUrl: './lotedetransferencia.page.html',
  styleUrls: ['./lotedetransferencia.page.scss'],
})
export class LotedetransferenciaPage implements OnInit {
  @ViewChild("holder") holder :ElementRef;
  @ViewChild("iconexcel") iconexcel:ElementRef;
  @ViewChild("txtsubir") txtsubir:ElementRef;
  @ViewChild("box") box:ElementRef;
  
  @HostListener("dragover", ["$event"]) onDragOver(evt) {
    evt.preventDefault()
    this.iconexcel.nativeElement.classList.remove("archivo-no-cargado");
    this.iconexcel.nativeElement.classList.add("archivo-cargado");
    this.txtsubir.nativeElement.firstChild.textContent="Sueltalo Aqui";
    this.box.nativeElement.firstChild.textContent="Esperando.";
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(evt) {
    evt.preventDefault()
    this.iconexcel.nativeElement.classList.remove("archivo-cargado");
    this.iconexcel.nativeElement.classList.add("archivo-no-cargado");
    this.txtsubir.nativeElement.firstChild.textContent="Subir Archivo de Debitos.";
    this.box.nativeElement.firstChild.textContent=" o Arrastrelo Aqui.";
    console.log("B");
  }
  public vistas = {
    "cargar":false,
    lista:true,
    transferencias:false
  }
  
  constructor() { }

  change(event){
    console.log(event.target.files[0]);
    this.iconexcel.nativeElement.classList.remove("archivo-no-cargado");
    this.iconexcel.nativeElement.classList.add("archivo-cargado");
    this.txtsubir.nativeElement.firstChild.textContent=event.target.files[0].name;
    this.box.nativeElement.firstChild.textContent="";
  }

  cambiar(vista){
    this.vistas={
      cargar:false,
      lista:false,
      transferencias:false
    }
    this.vistas[vista]=true;
  }

  ngOnInit() {
  // }
  // ondrag(event){
  //   console.log(event);
  
    // this.holder.ondragover =  ()=>{ //$(this).addClass('hover'); return false; 
    //     this.iconexcel.attr("class", "archivo-cargado");
    //     console.log("dragover");
    //     // $(".txt-subir").text("Sueltalo Aqui");
    //     // $(".box__dragndrop").html("Esperando.");
    //     return  false;
    // };
    // this.holder.ondragleave = ()=>{ //$(this).addClass('hover'); return false; 
    //     // $("#icon-excel").attr("class", "archivo-no-cargado");
    //     // $(".txt-subir").text("Subir archivo de Pagadores");
    //     // $(".box__dragndrop").html("o Arrastrelo aqui.");
    //     console.log("ondragleave");
    //     return  false;
    // };
    // //holder.ondragover = function () { this.className = 'hover'; return false; };
    // var drop = Object.assign({}, this.holder);
    // this.holder.ondrop = (e) =>{
    //     // $("#icon-excel").attr("class", "archivo-cargado");
    //     console.log(e.dataTransfer.files[0].name);
    //     // $(".txt-subir").text(e.dataTransfer.files[0].name);
    //     // $(".box__dragndrop").html("");
    //     console.log(e);
    //     return e;
    // };
    // // $("#archivo").change(function (e) {
    // //     var elemento = $(this).val().split("\\");
    // //     $(".txt-subir").text(elemento[2]);
    // //     $(".box__dragndrop").html("");
    // //     $("#icon-excel").attr("class", "archivo-cargado");
    // //     console.log(elemento);

    // // });
  }
}
