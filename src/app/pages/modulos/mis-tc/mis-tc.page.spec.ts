import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisTcPage } from './mis-tc.page';

describe('MisTcPage', () => {
  let component: MisTcPage;
  let fixture: ComponentFixture<MisTcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisTcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
