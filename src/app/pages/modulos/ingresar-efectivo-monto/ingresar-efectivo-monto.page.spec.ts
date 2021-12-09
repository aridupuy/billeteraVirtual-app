import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresarEfectivoMontoPage } from './ingresar-efectivo-monto.page';

describe('IngresarEfectivoMontoPage', () => {
  let component: IngresarEfectivoMontoPage;
  let fixture: ComponentFixture<IngresarEfectivoMontoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarEfectivoMontoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarEfectivoMontoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
