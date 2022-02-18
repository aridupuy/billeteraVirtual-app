import { TestBed } from '@angular/core/testing';

import { RevalidarRenaperService } from './revalidar-renaper.service';

describe('RevalidarRenaperService', () => {
  let service: RevalidarRenaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevalidarRenaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
