import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroCuentaexistenteSiPage } from './registro-cuentaexistente-si.page';

describe('RegistroCuentaexistenteSiPage', () => {
  let component: RegistroCuentaexistenteSiPage;
  let fixture: ComponentFixture<RegistroCuentaexistenteSiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCuentaexistenteSiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCuentaexistenteSiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
