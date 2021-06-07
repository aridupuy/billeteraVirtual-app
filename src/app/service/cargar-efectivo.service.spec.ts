import { TestBed } from '@angular/core/testing';

import { CargarEfectivoService } from './cargar-efectivo.service';

describe('CargarEfectivoService', () => {
  let service: CargarEfectivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarEfectivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
