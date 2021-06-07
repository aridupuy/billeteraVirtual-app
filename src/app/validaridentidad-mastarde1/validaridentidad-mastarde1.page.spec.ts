import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidaridentidadMastarde1Page } from './validaridentidad-mastarde1.page';

describe('ValidaridentidadMastarde1Page', () => {
  let component: ValidaridentidadMastarde1Page;
  let fixture: ComponentFixture<ValidaridentidadMastarde1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaridentidadMastarde1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidaridentidadMastarde1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
