import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionaMetodoPagoPage } from './selecciona-metodo-pago.page';

describe('SeleccionaMetodoPagoPage', () => {
  let component: SeleccionaMetodoPagoPage;
  let fixture: ComponentFixture<SeleccionaMetodoPagoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionaMetodoPagoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionaMetodoPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
