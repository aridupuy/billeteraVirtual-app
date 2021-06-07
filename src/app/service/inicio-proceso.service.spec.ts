import { TestBed } from '@angular/core/testing';

import { InicioProcesoService } from './inicio-proceso.service';

describe('InicioProcesoService', () => {
  let service: InicioProcesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicioProcesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
