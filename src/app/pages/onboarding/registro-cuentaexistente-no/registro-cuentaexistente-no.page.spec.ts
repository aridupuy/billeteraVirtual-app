import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteNoPage } from './registro-cuentaexistente-no.page';

describe('RegistroCuentaexistenteNoPage', () => {
  let component: RegistroCuentaexistenteNoPage;
  let fixture: ComponentFixture<RegistroCuentaexistenteNoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCuentaexistenteNoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaexistenteNoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
