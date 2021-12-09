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
    localStorage.setItem("onboardingLastPage","personapfpj");
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
    
    let json = JSON.parse(localStorage.getItem("varsOnboarding"));
    json["pfpj"]=this.pfpj;
    localStorage.setItem("varsOnboarding",JSON.stringify(json));
    this.navCtrl.navigateForward("registro1");
  }

}
