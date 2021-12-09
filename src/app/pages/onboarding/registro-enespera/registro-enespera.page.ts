import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-enespera',
  templateUrl: './registro-enespera.page.html',
  styleUrls: ['./registro-enespera.page.scss'],
})
export class RegistroEnesperaPage implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem("onboardingLastPage","registro-enespera");
  }

}
