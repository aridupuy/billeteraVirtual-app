import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostpasswordconfirmaWebPage } from './lostpasswordconfirma-web.page';

describe('LostpasswordconfirmaWebPage', () => {
  let component: LostpasswordconfirmaWebPage;
  let fixture: ComponentFixture<LostpasswordconfirmaWebPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LostpasswordconfirmaWebPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostpasswordconfirmaWebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
