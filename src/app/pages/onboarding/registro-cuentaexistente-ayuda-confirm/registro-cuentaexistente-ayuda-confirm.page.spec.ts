import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteAyudaConfirmPage } from './registro-cuentaexistente-ayuda-confirm.page';

describe('RegistroCuentaexistenteAyudaConfirmPage', () => {
  let component: RegistroCuentaexistenteAyudaConfirmPage;
  let fixture: ComponentFixture<RegistroCuentaexistenteAyudaConfirmPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCuentaexistenteAyudaConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaexistenteAyudaConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
