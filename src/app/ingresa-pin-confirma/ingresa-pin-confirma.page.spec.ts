import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresaPinConfirmaPage } from './ingresa-pin-confirma.page';

describe('IngresaPinConfirmaPage', () => {
  let component: IngresaPinConfirmaPage;
  let fixture: ComponentFixture<IngresaPinConfirmaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresaPinConfirmaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresaPinConfirmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
