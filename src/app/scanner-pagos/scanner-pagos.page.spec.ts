import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScannerPagosPage } from './scanner-pagos.page';

describe('ScannerPagosPage', () => {
  let component: ScannerPagosPage;
  let fixture: ComponentFixture<ScannerPagosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerPagosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerPagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
