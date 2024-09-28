import { TestBed } from '@angular/core/testing';

import { WebGuard } from './web.guard';

describe('WebGuard', () => {
  let guard: WebGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WebGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
