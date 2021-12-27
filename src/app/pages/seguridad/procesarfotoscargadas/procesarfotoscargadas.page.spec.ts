import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcesarfotoscargadasPage } from './procesarfotoscargadas.page';

describe('ProcesarfotoscargadasPage', () => {
  let component: ProcesarfotoscargadasPage;
  let fixture: ComponentFixture<ProcesarfotoscargadasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesarfotoscargadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesarfotoscargadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
