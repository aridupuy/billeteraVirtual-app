import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagoQrPage } from './pago-qr.page';

describe('PagoQrPage', () => {
  let component: PagoQrPage;
  let fixture: ComponentFixture<PagoQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
