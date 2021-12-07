import { TestBed } from '@angular/core/testing';

import { ValidacionEmpresaGuard } from './validacion-empresa.guard';

describe('ValidacionEmpresaGuard', () => {
  let guard: ValidacionEmpresaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidacionEmpresaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
