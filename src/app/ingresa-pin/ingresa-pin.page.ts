import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-ingresa-pin',
  templateUrl: './ingresa-pin.page.html',
  styleUrls: ['./ingresa-pin.page.scss'],
})
export class IngresaPinPage implements OnInit {
  @ViewChild('passcode1') passcode1;
  @ViewChild('passcode2') passcode2;
  @ViewChild('passcode3') passcode3;
  @ViewChild('passcode4') passcode4;
  values: any = [];
  public clave1
  public clave2
  public clave3
  constructor() { }

  ngOnInit() {
  }
  onKeyUp(event, index) {
    console.log(event);
    if(event.target.value.length != 1) {
    this.setFocus(index - 2);
  } else {
    this.values.push(event.target.value);
    this.setFocus(index);
  }
  event.stopPropagation();
}
setFocus(index) {

  switch (index) {
    case 0:
      this.passcode1.setFocus();
      break;
    case 1:
      this.passcode2.setFocus();
      break;
    case 2:
      this.passcode3.setFocus();
      break;
    case 3:
      this.passcode4.setFocus();
      break;
    default:
      this.passcode1.setFocus();
  }
}
}
