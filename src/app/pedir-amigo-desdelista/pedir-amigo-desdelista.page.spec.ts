import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirAmigoDesdelistaPage } from './pedir-amigo-desdelista.page';

describe('PedirAmigoDesdelistaPage', () => {
  let component: PedirAmigoDesdelistaPage;
  let fixture: ComponentFixture<PedirAmigoDesdelistaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirAmigoDesdelistaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirAmigoDesdelistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
