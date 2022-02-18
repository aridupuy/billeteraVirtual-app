import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatospersonalesEmpresa1Page } from './datospersonales-empresa1.page';

describe('DatospersonalesEmpresa1Page', () => {
  let component: DatospersonalesEmpresa1Page;
  let fixture: ComponentFixture<DatospersonalesEmpresa1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatospersonalesEmpresa1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatospersonalesEmpresa1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
