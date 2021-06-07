import { TestBed } from '@angular/core/testing';

import { IdentificadorTcService } from './identificador-tc.service';

describe('IdentificadorTcService', () => {
  let service: IdentificadorTcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificadorTcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
