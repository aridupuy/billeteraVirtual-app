import { TestBed } from '@angular/core/testing';

import { PatronGuard } from './patron.guard';

describe('PatronGuard', () => {
  let guard: PatronGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatronGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
