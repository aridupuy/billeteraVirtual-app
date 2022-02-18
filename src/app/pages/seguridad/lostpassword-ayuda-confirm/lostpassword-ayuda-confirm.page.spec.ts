import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostpasswordAyudaConfirmPage } from './lostpassword-ayuda-confirm.page';

describe('LostpasswordAyudaConfirmPage', () => {
  let component: LostpasswordAyudaConfirmPage;
  let fixture: ComponentFixture<LostpasswordAyudaConfirmPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LostpasswordAyudaConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostpasswordAyudaConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
