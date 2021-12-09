import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteAyudaPage } from './registro-cuentaexistente-ayuda.page';

describe('RegistroCuentaexistenteAyudaPage', () => {
  let component: RegistroCuentaexistenteAyudaPage;
  let fixture: ComponentFixture<RegistroCuentaexistenteAyudaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCuentaexistenteAyudaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaexistenteAyudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
