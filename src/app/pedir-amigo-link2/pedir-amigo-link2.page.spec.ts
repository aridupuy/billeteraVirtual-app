import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirAmigoLink2Page } from './pedir-amigo-link2.page';

describe('PedirAmigoLink2Page', () => {
  let component: PedirAmigoLink2Page;
  let fixture: ComponentFixture<PedirAmigoLink2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirAmigoLink2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirAmigoLink2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
