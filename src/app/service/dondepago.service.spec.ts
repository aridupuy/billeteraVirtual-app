import { TestBed } from '@angular/core/testing';

import { DondepagoService } from './dondepago.service';

describe('DondepagoService', () => {
  let service: DondepagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DondepagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
