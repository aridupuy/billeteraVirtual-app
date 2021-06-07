import { TestBed } from '@angular/core/testing';

import { EstadoProcesoService } from './estado-proceso.service';

describe('EstadoProcesoService', () => {
  let service: EstadoProcesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoProcesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
