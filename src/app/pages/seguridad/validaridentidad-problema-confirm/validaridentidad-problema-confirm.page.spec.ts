import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidaridentidadProblemaConfirmPage } from './validaridentidad-problema-confirm.page';

describe('ValidaridentidadProblemaConfirmPage', () => {
  let component: ValidaridentidadProblemaConfirmPage;
  let fixture: ComponentFixture<ValidaridentidadProblemaConfirmPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaridentidadProblemaConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidaridentidadProblemaConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
