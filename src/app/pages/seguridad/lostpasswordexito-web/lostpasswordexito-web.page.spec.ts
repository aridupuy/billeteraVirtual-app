import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostpasswordexitoWebPage } from './lostpasswordexito-web.page';

describe('LostpasswordexitoWebPage', () => {
  let component: LostpasswordexitoWebPage;
  let fixture: ComponentFixture<LostpasswordexitoWebPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LostpasswordexitoWebPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostpasswordexitoWebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
