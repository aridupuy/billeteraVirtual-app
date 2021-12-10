import { TestBed } from '@angular/core/testing';

import { ValidausuarioService } from './validausuario.service';

describe('ValidausuarioService', () => {
  let service: ValidausuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidausuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
