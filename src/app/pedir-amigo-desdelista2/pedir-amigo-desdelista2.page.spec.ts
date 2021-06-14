import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirAmigoDesdelista2Page } from './pedir-amigo-desdelista2.page';

describe('PedirAmigoDesdelista2Page', () => {
  let component: PedirAmigoDesdelista2Page;
  let fixture: ComponentFixture<PedirAmigoDesdelista2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirAmigoDesdelista2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirAmigoDesdelista2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
