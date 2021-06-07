import { TestBed } from '@angular/core/testing';

import { ProcesoAltaGuard } from './proceso-alta.guard';

describe('ProcesoAltaGuard', () => {
  let guard: ProcesoAltaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProcesoAltaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
