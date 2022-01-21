import { TestBed } from '@angular/core/testing';

import { UssersService } from './ussers.service';

describe('UssersService', () => {
  let service: UssersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UssersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
