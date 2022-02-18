import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidaridentidadProblemaPage } from './validaridentidad-problema.page';

describe('ValidaridentidadProblemaPage', () => {
  let component: ValidaridentidadProblemaPage;
  let fixture: ComponentFixture<ValidaridentidadProblemaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaridentidadProblemaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidaridentidadProblemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
