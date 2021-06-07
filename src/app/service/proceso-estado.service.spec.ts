import { TestBed } from '@angular/core/testing';

import { ProcesoEstadoService } from './proceso-estado.service';

describe('ProcesoEstadoService', () => {
  let service: ProcesoEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesoEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
