import { TestBed } from '@angular/core/testing';

import { PagoGuardGuard } from './pago-guard.guard';

describe('PagoGuardGuard', () => {
  let guard: PagoGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PagoGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
