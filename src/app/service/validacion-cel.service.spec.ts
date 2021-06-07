import { TestBed } from '@angular/core/testing';

import { ValidacionCelService } from './validacion-cel.service';

describe('ValidacionCelService', () => {
  let service: ValidacionCelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacionCelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
