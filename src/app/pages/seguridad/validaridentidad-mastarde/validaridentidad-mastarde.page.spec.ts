import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidaridentidadMastardePage } from './validaridentidad-mastarde.page';

describe('ValidaridentidadMastardePage', () => {
  let component: ValidaridentidadMastardePage;
  let fixture: ComponentFixture<ValidaridentidadMastardePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaridentidadMastardePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidaridentidadMastardePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
