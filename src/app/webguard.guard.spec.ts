import { TestBed } from '@angular/core/testing';

import { WebguardGuard } from './webguard.guard';

describe('WebguardGuard', () => {
  let guard: WebguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WebguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
