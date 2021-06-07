import { TestBed } from '@angular/core/testing';

import { ObtenerDatosService } from './obtener-datos.service';

describe('ObtenerDatosService', () => {
  let service: ObtenerDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
