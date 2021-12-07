import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-personapfpj',
  templateUrl: './personapfpj.page.html',
  styleUrls: ['./personapfpj.page.scss'],
})
export class PersonapfpjPage implements OnInit {
  @ViewChild('pf', {read: ElementRef}) viewpf : ElementRef;
  @ViewChild('pj', {read: ElementRef}) viewpj : ElementRef;

  valid=false;
  pfpj;
  active=0;
  params;
  constructor(public route: ActivatedRoute, public router: Router,private navCtrl : NavController,private renderer: Renderer2) { }

  ngOnInit() {
    this.params  = JSON.parse(this.route.snapshot.queryParamMap.get("param"));
    console.log(this.params);
  }
  validar(pfpj,element){
    if(pfpj!=null){
      this.valid=true;
    }
    // 
    this.renderer.removeClass(this.viewpf.nativeElement,"active");
    this.renderer.removeClass(this.viewpj.nativeElement,"active");
    this.renderer.addClass(element.el,"active");
    this.pfpj=pfpj;
  }
  Continuar(){
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param: JSON.stringify({ email: this.params.email, password: this.params.password, acepta: this.params.acepta,pfpj:this.pfpj,proceso_alta:this.params.proceso_alta })
      }
    };
    console.log(navigationExtras);
    this.navCtrl.navigateForward("registro1", navigationExtras);
  }

}
