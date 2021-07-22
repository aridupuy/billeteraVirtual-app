import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferenciaNuevacuentaPage } from './transferencia-nuevacuenta.page';

describe('TransferenciaNuevacuentaPage', () => {
  let component: TransferenciaNuevacuentaPage;
  let fixture: ComponentFixture<TransferenciaNuevacuentaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciaNuevacuentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferenciaNuevacuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
