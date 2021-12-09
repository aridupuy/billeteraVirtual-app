import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormTcPage } from './form-tc.page';

describe('FormTcPage', () => {
  let component: FormTcPage;
  let fixture: ComponentFixture<FormTcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
