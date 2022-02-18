import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistentePage } from './registro-cuentaexistente.page';

describe('RegistroCuentaexistentePage', () => {
  let component: RegistroCuentaexistentePage;
  let fixture: ComponentFixture<RegistroCuentaexistentePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCuentaexistentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaexistentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
