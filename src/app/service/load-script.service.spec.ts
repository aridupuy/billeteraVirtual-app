import { TestBed } from '@angular/core/testing';

import { LoadScriptService } from './load-script.service';

describe('LoadScriptService', () => {
  let service: LoadScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
